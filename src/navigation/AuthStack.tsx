import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import EmailVerification from '../screens/Auth/EmailVerification';
import ResetPassword from '../screens/Auth/ResetPassword';

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
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
