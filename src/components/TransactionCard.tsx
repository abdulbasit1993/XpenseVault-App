import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/ExpenseCardStyles';
import moment from 'moment';
import Spacer from './Spacer';

const TransactionCard = ({data, onPress}) => {
  const {title, date, totalAmount, amount} = data;
  const formattedDate = moment(date).format('DD MMM YYYY');

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.titleView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Spacer mT={10} />
      <View style={styles.row}>
        <Text style={styles.dateText}>Date:</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <Spacer mT={10} />
      <View style={styles.row}>
        <Text style={styles.amountText}>Total Amount:</Text>
        <Text style={styles.amountText}>Rs. {totalAmount ?? amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
