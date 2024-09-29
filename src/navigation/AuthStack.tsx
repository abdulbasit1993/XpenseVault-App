import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import ForgotPassword from '../screens/Auth/ForgotPassword';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  const options = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
