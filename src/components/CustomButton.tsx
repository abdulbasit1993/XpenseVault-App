import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../styles/CustomButtonStyles';

const CustomButton = ({title, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.titleText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
