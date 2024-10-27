import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  const options = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={options} initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
