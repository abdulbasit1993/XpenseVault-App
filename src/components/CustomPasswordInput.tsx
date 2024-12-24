import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/CustomPasswordInputStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/colors';

const CustomPasswordInput = ({
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
      <View style={styles.inputView}>
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

      <View style={styles.eyeIconView}>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={25}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomPasswordInput;
