import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {HeaderProps} from '../types/HeaderTypes';
import {styles} from '../styles/HeaderStyles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../constants/colors';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../redux/slices/themeSlice';

const Header: React.FC<HeaderProps> = ({
  title,
  drawer,
  backIcon,
  themeSwitch,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  console.log('isDarkMode ==>> ', isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        {drawer ? (
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
        ) : backIcon ? (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcon
              name="arrow-left"
              color={Colors.WHITE}
              style={{fontSize: 25}}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightView}>
        {themeSwitch ? (
          <Pressable onPress={() => dispatch(toggleTheme())}>
            <MaterialIcon
              name={isDarkMode ? 'light-mode' : 'dark-mode'}
              color={Colors.WHITE}
              style={{fontSize: 25}}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Header;
