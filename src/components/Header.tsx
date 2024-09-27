import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/HeaderStyles';
import {HeaderProps} from '../types/HeaderTypes';

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Header;
