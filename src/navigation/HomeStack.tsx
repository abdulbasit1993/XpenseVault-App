import {CustomDrawer} from '../components/CustomDrawer';
import {Colors} from '../constants/colors';
import AddExpenseScreen from '../screens/Home/AddExpenseScreen';
import ExpensesScreen from '../screens/Home/ExpensesScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const HomeStack = () => {
  const DrawerStack = createDrawerNavigator();

  const options = {
    headerShown: false,
  };

  return (
    <DrawerStack.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        ...options,
        drawerLabelStyle: {
          color: Colors.WHITE,
        },
      }}
      initialRouteName="HomeScreen">
      <DrawerStack.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerStack.Screen
        name="AddExpenseScreen"
        component={AddExpenseScreen}
      />
      <DrawerStack.Screen name="ExpensesScreen" component={ExpensesScreen} />
    </DrawerStack.Navigator>
  );
};

export default HomeStack;
