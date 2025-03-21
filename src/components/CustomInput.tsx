import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/CustomInputStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/colors';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
  keyboardType,
  customInputStyles,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, customInputStyles]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#A9A9A9'}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

export default CustomInput;
