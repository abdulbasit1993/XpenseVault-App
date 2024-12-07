import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/ExpenseDetailScreenStyles';
import {useRoute} from '@react-navigation/native';
import {useGetSingleExpenseQuery} from '../../redux/services';
import Spacer from '../../components/Spacer';

const ExpenseDetailScreen = ({navigation}) => {
  const route = useRoute();

  const {id: expenseId} = route?.params;

  const {
    data: expenseData,
    error,
    isLoading,
  } = useGetSingleExpenseQuery(expenseId);

  const {
    data: {
      title,
      description,
      expenseCategory: {name},
    },
  } = expenseData || {};

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};

export default ExpenseDetailScreen;
