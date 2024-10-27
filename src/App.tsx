import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {ToastProvider} from './contexts/ToastContext';
import HomeStack from './navigation/HomeStack';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={stackOptions}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
};

export default App;
