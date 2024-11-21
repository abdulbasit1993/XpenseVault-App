import React, {Fragment} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Colors} from '../constants/colors';
import {Linking, Pressable, ScrollView, Text, View} from 'react-native';
import {removeData} from '../utils/storageService';
import {resetStack} from '../navigation/navigationService';
import {resetAuthState} from '../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Spacer from './Spacer';

const {PRIMARY} = Colors;

export function CustomDrawer(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authState = useSelector(state => state.authState);
  const {user} = authState || {};

  const handleLogout = async () => {
    try {
      await removeData('token');
      dispatch(resetAuthState());
      resetStack(props.navigation, 'AuthStack');
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  const modifiedItems = props.state.routes.map(route => {
    let label = route.name;

    if (route.name === 'HomeScreen') {
      label = 'Home';
    }

    return {
      ...route,
      label,
    };
  });

  return (
    <ScrollView
      {...props}
      style={{
        flex: 1,
        backgroundColor: PRIMARY,
      }}>
      <View
        style={{
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
          }}>
          <MaterialCommunityIcon
            name="close"
            color={Colors.WHITE}
            style={{fontSize: 20}}
          />
        </Pressable>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'flex-start',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FontAwesomeIcon
            name="user-circle"
            color={Colors.WHITE}
            style={{fontSize: 50}}
          />
          <Spacer mT={5} />
          <Text style={{color: Colors.WHITE, fontSize: 18}}>{user?.name}</Text>
        </View>
      </View>

      <Spacer mB={15} />

      <View>
        {modifiedItems.map((route, index) => {
          const isActive = props.state.index === index;

          return (
            <DrawerItem
              key={route.key}
              label={route.label}
              onPress={() => props.navigation.navigate(route.name)}
              labelStyle={{
                color: Colors.WHITE,
              }}
              style={{
                backgroundColor: isActive ? '#8b489c' : 'transparent',
              }}
            />
          );
        })}
      </View>

      <View
        style={{
          paddingHorizontal: 17,
        }}>
        <Pressable
          onPress={() => {
            handleLogout();
          }}>
          <Text style={{color: Colors.WHITE, fontWeight: 700}}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
