import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import {styles} from '../../styles/AddIncomeScreenStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Spacer from '../../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useAddExpenseMutation,
  useAddIncomeMutation,
  useGetIncomeCategoriesQuery,
} from '../../redux/services';
import {Colors} from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  validateAmount,
  validateDate,
  validateExpenseCategory,
  validateIncomeCategory,
  validateTitle,
} from '../../utils/validations';
import {useToast} from '../../contexts/ToastContext';
import FullScreenLoader from '../../components/FullScreenLoader';

const AddIncomeScreen = ({navigation}) => {
  const {
    data,
    error,
    isLoading: isIncomeCategoryLoading,
  } = useGetIncomeCategoriesQuery({});

  const {data: incomeCategoriesData} = data || {};

  const {showToast} = useToast();

  const [newIncomeData, setNewIncomeData] = useState({
    title: '',
    description: '',
    date: null,
    amount: '',
    incomeSourceId: null,
  });

  const [openIncomeCategory, setOpenIncomeCategory] = useState(false);
  const [incomeCategoryValue, setIncomeCategoryValue] = useState(null);

  const [incomeCategoryItems, setIncomeCategoryItems] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [errors, setErrors] = useState({
    titleError: '',
    dateError: '',
    amountError: '',
    incomeCategoryError: '',
  });

  const [addIncome, {isLoading: isAddIncomeLoading}] = useAddIncomeMutation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setNewIncomeData(prevState => ({
      ...prevState,
      date: date,
    }));
    hideDatePicker();
  };

  const handleInputChange = (key, value) => {
    if (key === 'amount') {
      value = parseFloat(value) || 0;
    }
    setNewIncomeData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const titleError = validateTitle(newIncomeData.title);
    const dateError = validateDate(newIncomeData.date);
    const amountError = validateAmount(newIncomeData.amount);
    const incomeCategoryError = validateIncomeCategory(
      newIncomeData.incomeSourceId,
    );

    setErrors({
      titleError: titleError,
      dateError: dateError,
      amountError: amountError,
      incomeCategoryError: incomeCategoryError,
    });

    console.log('submitting data ==>> ', newIncomeData);

    if (!titleError && !dateError && !amountError && !incomeCategoryError) {
      try {
        const response = await addIncome(newIncomeData).unwrap();

        console.log('response add income : ', response);

        if (response?.success) {
          const {message} = response;
          showToast(message, 'success');
          setNewIncomeData({
            title: '',
            description: '',
            date: null,
            amount: '',
            incomeSourceId: null,
          });
          setIncomeCategoryValue(null);
          //   navigation.navigate('HomeScreen');
        }
      } catch (error) {
        console.log('Error add income : ', error);
        const {
          data: {message},
        } = error;

        showToast(message, 'error');
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (incomeCategoriesData) {
      const formattedItems = incomeCategoriesData
        ?.map(category => ({
          label:
            category?.name === 'GovernmentBenefits'
              ? 'Government Benefits'
              : category?.name,
          value: category?.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      setIncomeCategoryItems(formattedItems);
    }
  }, [incomeCategoriesData]);

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isAddIncomeLoading} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.subContainer}>
          <View
            style={styles.formView}
            pointerEvents="auto"
            collapsable={false}>
            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Title:</Text>
              </View>
              <CustomInput
                value={newIncomeData.title}
                onChangeText={text => handleInputChange('title', text)}
                placeholder={'Enter Title for Income'}
              />
            </View>

            {errors.titleError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.titleError}</Text>
              </View>
            )}

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Description:</Text>
              </View>
              <CustomInput
                value={newIncomeData.description}
                onChangeText={text => handleInputChange('description', text)}
                placeholder={'Enter Description for Income'}
                multiline={true}
                numberOfLines={5}
                customInputStyles={{textAlignVertical: 'top'}}
              />
            </View>

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Date:</Text>
              </View>

              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.dateInput}>
                <Text style={styles.dateText}>
                  {newIncomeData.date
                    ? moment(newIncomeData.date).format('DD/MM/YYYY')
                    : 'Select a Date'}
                </Text>
              </TouchableOpacity>
            </View>

            {errors.dateError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.dateError}</Text>
              </View>
            )}

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Total Amount:</Text>
              </View>

              <CustomInput
                value={newIncomeData.amount}
                onChangeText={text => handleInputChange('amount', text)}
                placeholder={'Enter Total Amount for Income'}
                keyboardType="numeric"
              />
            </View>

            {errors.amountError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.amountError}</Text>
              </View>
            )}

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Income Category:</Text>
              </View>
              <DropDownPicker
                open={openIncomeCategory}
                value={incomeCategoryValue}
                items={incomeCategoryItems}
                setOpen={setOpenIncomeCategory}
                setValue={setIncomeCategoryValue}
                setItems={setIncomeCategoryItems}
                onSelectItem={item => {
                  setIncomeCategoryValue(item);
                  setNewIncomeData(prevState => ({
                    ...prevState,
                    incomeSourceId: item?.value,
                  }));
                }}
                loading={isIncomeCategoryLoading}
                style={{
                  borderWidth: 3,
                  borderColor: Colors.PRIMARY,
                }}
                placeholder="Select an Income Category"
                listMode="MODAL"
              />
            </View>

            {errors.incomeCategoryError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors.incomeCategoryError}
                </Text>
              </View>
            )}
          </View>

          <CustomButton
            title="Submit"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default AddIncomeScreen;
