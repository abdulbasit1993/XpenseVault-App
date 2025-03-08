import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import TransactionCard from '../../components/TransactionCard';
import {useGetExpensesOfUserQuery} from '../../redux/services';
import {styles} from '../../styles/ExpensesScreenStyles';

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
      <TransactionCard
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

            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>

            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>

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
    </View>
  );
};

export default ExpensesScreen;
