import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles/SplashScreenStyles';
import {Colors} from '../constants/colors';
import {getData} from '../utils/storageService';
import {resetStack} from '../navigation/navigationService';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const token = await getData('token');

      setTimeout(() => {
        if (token) {
          resetStack(navigation, 'HomeStack');
        } else {
          resetStack(navigation, 'AuthStack');
        }
      }, 2000);
    } catch (error) {
      console.log('Error getting token: ', error);
      resetStack(navigation, 'AuthStack');
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>XpenseVault</Text>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
      </View>
    </View>
  );
};

export default SplashScreen;
