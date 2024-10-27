import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/Header';
import {styles} from '../../styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Home" />
    </View>
  );
};

export default HomeScreen;
