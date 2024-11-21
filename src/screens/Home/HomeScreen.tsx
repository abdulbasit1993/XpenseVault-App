import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Home" isHome />

      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Recent Transactions</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
