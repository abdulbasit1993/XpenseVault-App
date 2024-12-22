import React from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {styles} from '../styles/CustomButtonStyles';

const CustomButton = ({title, onPress, customStyles, customTextStyles}) => {
  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[styles.titleText, customTextStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
