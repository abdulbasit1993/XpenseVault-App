import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import {styles} from '../../styles/AddExpenseScreenStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Spacer from '../../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useAddExpenseMutation,
  useGetExpenseCategoriesQuery,
} from '../../redux/services';
import {Colors} from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  validateAmount,
  validateDate,
  validateExpenseCategory,
  validateTitle,
} from '../../utils/validations';
import {useToast} from '../../contexts/ToastContext';
import FullScreenLoader from '../../components/FullScreenLoader';

const AddExpenseScreen = ({navigation}) => {
  const {
    data,
    error,
    isLoading: isExpenseCategoryLoading,
  } = useGetExpenseCategoriesQuery({});

  const {data: expenseCategoriesData} = data || {};

  const {showToast} = useToast();

  const [newExpenseData, setNewExpenseData] = useState({
    title: '',
    description: '',
    date: null,
    totalAmount: '',
    expenseCategoryId: null,
  });

  const [openExpenseCategory, setOpenExpenseCategory] = useState(false);
  const [expenseCategoryValue, setExpenseCategoryValue] = useState(null);

  const [expenseCategoryItems, setExpenseCategoryItems] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [errors, setErrors] = useState({
    titleError: '',
    dateError: '',
    amountError: '',
    expenseCategoryError: '',
  });

  const [addExpense, {isLoading: isAddExpenseLoading}] =
    useAddExpenseMutation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setNewExpenseData(prevState => ({
      ...prevState,
      date: date,
    }));
    hideDatePicker();
  };

  const handleInputChange = (key, value) => {
    if (key === 'totalAmount') {
      value = parseFloat(value) || 0;
    }
    setNewExpenseData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const titleError = validateTitle(newExpenseData.title);
    const dateError = validateDate(newExpenseData.date);
    const amountError = validateAmount(newExpenseData.totalAmount);
    const expenseCategoryError = validateExpenseCategory(
      newExpenseData.expenseCategoryId,
    );

    setErrors({
      titleError: titleError,
      dateError: dateError,
      amountError: amountError,
      expenseCategoryError: expenseCategoryError,
    });

    if (!titleError && !dateError && !amountError && !expenseCategoryError) {
      try {
        const response = await addExpense(newExpenseData).unwrap();

        if (response?.success) {
          const {message} = response;
          showToast(message, 'success');
          setNewExpenseData({
            title: '',
            description: '',
            date: null,
            totalAmount: '',
            expenseCategoryId: null,
          });
          setExpenseCategoryValue(null);
          navigation.navigate('ExpensesScreen');
        }
      } catch (error) {
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
    if (expenseCategoriesData) {
      const formattedItems = expenseCategoriesData?.map(category => ({
        label:
          category?.name === 'HealthAndWellness'
            ? 'Health And Wellness'
            : category?.name === 'SavingsAndInvestments'
            ? 'Savings And Investments'
            : category?.name,
        value: category?.id,
      }));
      setExpenseCategoryItems(formattedItems);
    }
  }, [expenseCategoriesData]);

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isAddExpenseLoading} />
      <Header title="Add Expense" backIcon />

      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.formView}>
            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Title:</Text>
              </View>
              <CustomInput
                value={newExpenseData.title}
                onChangeText={text => handleInputChange('title', text)}
                placeholder={'Enter Title for Expense'}
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
                value={newExpenseData.description}
                onChangeText={text => handleInputChange('description', text)}
                placeholder={'Enter Description for Expense'}
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
                  {newExpenseData.date
                    ? moment(newExpenseData.date).format('DD/MM/YYYY')
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
                value={newExpenseData.totalAmount}
                onChangeText={text => handleInputChange('totalAmount', text)}
                placeholder={'Enter Total Amount for Expense'}
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
                <Text style={styles.label}>Expense Category:</Text>
              </View>
              <DropDownPicker
                open={openExpenseCategory}
                value={expenseCategoryValue}
                items={expenseCategoryItems}
                setOpen={setOpenExpenseCategory}
                setValue={setExpenseCategoryValue}
                setItems={setExpenseCategoryItems}
                onSelectItem={item => {
                  setExpenseCategoryValue(item);
                  setNewExpenseData(prevState => ({
                    ...prevState,
                    expenseCategoryId: item?.value,
                  }));
                }}
                loading={isExpenseCategoryLoading}
                style={{
                  borderWidth: 3,
                  borderColor: Colors.PRIMARY,
                }}
                placeholder="Select an Expense Category"
                listMode="MODAL"
              />
            </View>

            {errors.expenseCategoryError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors.expenseCategoryError}
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

export default AddExpenseScreen;
