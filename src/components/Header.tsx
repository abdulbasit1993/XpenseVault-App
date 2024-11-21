import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {HeaderProps} from '../types/HeaderTypes';
import {styles} from '../styles/HeaderStyles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/colors';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Header: React.FC<HeaderProps> = ({title, isHome}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        {isHome && (
          <Pressable
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MaterialCommunityIcon
              name="menu"
              color={Colors.WHITE}
              style={{fontSize: 25}}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightView}></View>
    </View>
  );
};

export default Header;
