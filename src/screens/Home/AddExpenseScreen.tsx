import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles/AddExpenseScreenStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import Spacer from '../../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGetExpenseCategoriesQuery} from '../../redux/services';
import {Colors} from '../../constants/colors';

const AddExpenseScreen = () => {
  const {data, error, isLoading} = useGetExpenseCategoriesQuery({});

  const {data: expenseCategoriesData} = data || {};

  console.log('expense categories : ', expenseCategoriesData);

  const [newExpenseData, setNewExpenseData] = useState({
    title: '',
    description: '',
    date: '',
    totalAmount: '',
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const handleInputChange = (key, value) => {
    setNewExpenseData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (expenseCategoriesData) {
      const formattedItems = expenseCategoriesData?.map(category => ({
        label: category?.name,
        value: category?.id,
      }));
      setItems(formattedItems);
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
              <Text style={styles.label}>Expense Category:</Text>
            </View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              loading={isLoading}
              style={{
                borderWidth: 3,
                borderColor: Colors.PRIMARY,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseScreen;
