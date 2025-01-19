import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import Header from '../../components/Header';
import {styles} from '../../styles/TransactionsScreenStyles';
import {Colors} from '../../constants/colors';

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

        <PagerView style={{flex: 1}} initialPage={0}>
          {pageIndex === 0 ? (
            <View key={1}>
              <Text style={{color: Colors.BLACK, fontSize: 16}}>
                First page
              </Text>
            </View>
          ) : pageIndex === 1 ? (
            <View key={2}>
              <Text>Second page</Text>
            </View>
          ) : (
            <></>
          )}
        </PagerView>
      </View>
    </View>
  );
};

export default TransactionsScreen;
