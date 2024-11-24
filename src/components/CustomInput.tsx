import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/CustomInputStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/colors';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  type,
  multiline,
  numberOfLines,
  keyboardType,
  customInputStyles,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, customInputStyles]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#A9A9A9'}
          secureTextEntry={type === 'password' && !showPassword ? true : false}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>

      {type === 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={25}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
