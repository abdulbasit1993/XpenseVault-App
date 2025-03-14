import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/HomeScreenStyles';
import FloatingActionButton from '../../components/FloatingActionButton';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Home" drawer />

      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Recent Transactions</Text>
      </View>

      <FloatingActionButton
        onPress={() => {
          navigation.navigate('TransactionsScreen');
        }}
      />
    </View>
  );
};

export default HomeScreen;
