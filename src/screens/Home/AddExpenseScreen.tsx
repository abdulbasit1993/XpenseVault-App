import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/AddExpenseScreenStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Spacer from '../../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGetExpenseCategoriesQuery} from '../../redux/services';
import {Colors} from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AddExpenseScreen = () => {
  const {data, error, isLoading} = useGetExpenseCategoriesQuery({});

  const {data: expenseCategoriesData} = data || {};

  const [newExpenseData, setNewExpenseData] = useState({
    title: '',
    description: '',
    date: null,
    totalAmount: 0,
    expenseCategoryId: null,
  });

  console.log('newExpenseData : ', newExpenseData);
  const [openExpenseCategory, setOpenExpenseCategory] = useState(false);
  const [expenseCategoryValue, setExpenseCategoryValue] = useState(null);

  const [expenseCategoryItems, setExpenseCategoryItems] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

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
    setNewExpenseData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {};

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
      <Header title="Add Expense" />

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
            />
          </View>

          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <Text style={styles.label}>Date:</Text>
            </View>

            <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
              <Text style={styles.dateText}>
                {selectedDate
                  ? moment(selectedDate).format('DD/MM/YYYY')
                  : 'Select a Date'}
              </Text>
            </TouchableOpacity>
          </View>

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
                console.log('item selected : ', item);
                setExpenseCategoryValue(item);
                setNewExpenseData(prevState => ({
                  ...prevState,
                  expenseCategoryId: item?.value,
                }));
              }}
              loading={isLoading}
              style={{
                borderWidth: 3,
                borderColor: Colors.PRIMARY,
              }}
              placeholder="Select an Expense Category"
            />
          </View>
        </View>

        <CustomButton
          title="Submit"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>

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
