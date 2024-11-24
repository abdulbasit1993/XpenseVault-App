import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/ExpensesScreenStyles';
import {useGetExpensesOfUserQuery} from '../../redux/services';
import FullScreenLoader from '../../components/FullScreenLoader';
import ExpenseCard from '../../components/ExpenseCard';
import FloatingActionButton from '../../components/FloatingActionButton';

const ExpensesScreen = ({navigation}) => {
  const {
    data: expenseData,
    error,
    isLoading: isExpenseLoading,
  } = useGetExpensesOfUserQuery({});

  const {data = []} = expenseData || {};

  const renderExpenses = ({item}) => {
    return <ExpenseCard data={item} onPress={() => {}} />;
  };

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isExpenseLoading} />
      <Header title="Expenses" drawer />

      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Expenses</Text>

        <FlatList
          data={data}
          renderItem={renderExpenses}
          contentContainerStyle={{marginTop: 15}}
        />
      </View>

      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddExpenseScreen');
        }}
      />
    </View>
  );
};

export default ExpensesScreen;
