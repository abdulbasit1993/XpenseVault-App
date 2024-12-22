import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/ExpenseDetailScreenStyles';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {
  useDeleteExpenseMutation,
  useGetSingleExpenseQuery,
} from '../../redux/services';
import Spacer from '../../components/Spacer';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../constants/colors';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import {useToast} from '../../contexts/ToastContext';
import FullScreenLoader from '../../components/FullScreenLoader';

const ExpenseDetailScreen = ({navigation}) => {
  const route = useRoute();
  const isFocused = useIsFocused();

  const {id: expenseId} = route?.params;

  const {showToast} = useToast();

  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  const {
    data: expenseData = {},
    error,
    isLoading,
    refetch,
  } = useGetSingleExpenseQuery(expenseId);

  const [deleteExpense, {isLoading: isDeleteExpenseLoading}] =
    useDeleteExpenseMutation();

  const {
    title = '',
    description = '',
    date = '',
    totalAmount = 0,
    expenseCategory: {name = ''} = {},
  } = expenseData.data || {};

  const handleDeleteExpense = async () => {
    setDeleteConfirmModalVisible(false);

    try {
      const response = await deleteExpense(expenseId).unwrap();

      if (response?.success) {
        const {message} = response;
        showToast(message, 'success');

        navigation.navigate('ExpensesScreen');
      }
    } catch (error) {
      const {
        data: {message},
      } = error;

      showToast(message, 'error');
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isDeleteExpenseLoading} />
      <Header title="Expense Detail" drawer />

      <View style={styles.subContainer}>
        <Text style={styles.headingText}>{title}</Text>

        <Spacer mT={20} />
        <Text style={styles.labelText}>Description:</Text>
        <Spacer mT={10} />
        <Text style={styles.descriptionText}>{description}</Text>

        <Spacer mT={20} />
        <Text style={styles.labelText}>Category:</Text>
        <Spacer mT={10} />
        <Text style={styles.descriptionText}>{name}</Text>

        <Spacer mT={20} />
        <Text style={styles.labelText}>Date:</Text>
        <Spacer mT={10} />
        <Text style={styles.descriptionText}>
          {moment(date).format('dddd, MMMM DD, YYYY')}
        </Text>

        <Spacer mT={20} />
        <Text style={styles.labelText}>Amount:</Text>
        <Spacer mT={10} />
        <Text style={styles.descriptionText}>
          <Text style={{fontWeight: '700'}}>Rs. </Text>
          {totalAmount}
        </Text>

        <Spacer mT={20} />

        <View style={styles.buttonsRow}>
          <CustomButton
            title="Update"
            onPress={() => {
              navigation.navigate('UpdateExpenseScreen', {
                expenseId: expenseId,
              });
            }}
          />

          <CustomButton
            title="Delete"
            onPress={() => {
              setDeleteConfirmModalVisible(true);
            }}
            customStyles={{backgroundColor: Colors.RED}}
          />
        </View>
      </View>

      <DeleteConfirmModal
        isModalVisible={deleteConfirmModalVisible}
        onConfirmPress={() => {
          handleDeleteExpense();
        }}
        onClosePress={() => {
          setDeleteConfirmModalVisible(false);
        }}
      />
    </View>
  );
};

export default ExpenseDetailScreen;
