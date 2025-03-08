import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import Header from '../../components/Header';
import {styles} from '../../styles/TransactionsScreenStyles';
import {Colors} from '../../constants/colors';
import AddExpenseScreen from './AddExpenseScreen';
import AddIncomeScreen from './AddIncomeScreen';

const TransactionsScreen = () => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Header title="Add Transaction" drawer />

      <View style={styles.subContainer}>
        <View style={styles.topTabsView}>
          {['Expense', 'Income'].map((option, index) => (
            <TouchableOpacity
              onPress={() => {
                setPageIndex(index);
              }}
              style={
                pageIndex === index ? styles.tabButtonFocused : styles.tabButton
              }>
              <Text
                style={
                  pageIndex === index
                    ? styles.tabButtonTextFocused
                    : styles.tabButtonText
                }>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {pageIndex === 0 ? (
          <AddExpenseScreen />
        ) : pageIndex === 1 ? (
          <AddIncomeScreen />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default TransactionsScreen;
