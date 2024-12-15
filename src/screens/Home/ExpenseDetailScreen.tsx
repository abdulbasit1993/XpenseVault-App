import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/ExpenseDetailScreenStyles';
import {useRoute} from '@react-navigation/native';
import {useGetSingleExpenseQuery} from '../../redux/services';
import Spacer from '../../components/Spacer';
import moment from 'moment';

const ExpenseDetailScreen = ({navigation}) => {
  const route = useRoute();

  const {id: expenseId} = route?.params;

  const {
    data: expenseData = {},
    error,
    isLoading,
  } = useGetSingleExpenseQuery(expenseId);

  console.log('expense data ==>> ', expenseData);

  const {
    title = '',
    description = '',
    date = '',
    totalAmount = 0,
    expenseCategory: {name = ''} = {},
  } = expenseData.data || {};

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
      </View>
    </View>
  );
};

export default ExpenseDetailScreen;
