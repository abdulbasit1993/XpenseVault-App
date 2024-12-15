import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/ExpensesScreenStyles';
import {useGetExpensesOfUserQuery} from '../../redux/services';
import FullScreenLoader from '../../components/FullScreenLoader';
import ExpenseCard from '../../components/ExpenseCard';
import FloatingActionButton from '../../components/FloatingActionButton';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Spacer from '../../components/Spacer';
import {useIsFocused} from '@react-navigation/native';

const ExpensesScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const {
    data: expenseData,
    error,
    isLoading: isExpenseLoading,
    refetch,
  } = useGetExpensesOfUserQuery({});

  const {data = []} = expenseData || {};

  const renderExpenses = ({item}) => {
    return (
      <ExpenseCard
        data={item}
        onPress={() => {
          navigation.navigate('ExpenseDetailScreen', {id: item?.id});
        }}
      />
    );
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      <Header title="Expenses" drawer />

      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Expenses</Text>

        {isExpenseLoading ? (
          <>
            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>
          </>
        ) : (
          <FlatList
            data={data}
            renderItem={renderExpenses}
            contentContainerStyle={{marginTop: 15}}
          />
        )}
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
