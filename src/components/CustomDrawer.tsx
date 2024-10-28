import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Colors} from '../constants/colors';
import {Linking, Text, View} from 'react-native';
import {removeData} from '../utils/storageService';
import {resetStack} from '../navigation/navigationService';

const {PRIMARY} = Colors;

export function CustomDrawer(props) {
  const handleLogout = async () => {
    try {
      await removeData('token');
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
    <DrawerContentScrollView {...props} style={{backgroundColor: PRIMARY}}>
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
      <View>
        <DrawerItem
          label={({focused, color}) => (
            <Text style={{color: Colors.WHITE}}>Logout</Text>
          )}
          onPress={() => {
            handleLogout();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
