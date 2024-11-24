import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/FloatingActionButtonStyles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/colors';

const FloatingActionButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcon
        name="plus"
        style={{fontSize: 23}}
        color={Colors.WHITE}
      />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
