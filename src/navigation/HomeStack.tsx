import {CustomDrawer} from '../components/CustomDrawer';
import {Colors} from '../constants/colors';
import HomeScreen from '../screens/Home/HomeScreen';
import AddExpenseScreen from '../screens/Home/AddExpenseScreen';
import ExpensesScreen from '../screens/Home/ExpensesScreen';
import ExpenseDetailScreen from '../screens/Home/ExpenseDetailScreen';
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
      <DrawerStack.Screen
        name="ExpenseDetailScreen"
        component={ExpenseDetailScreen}
      />
    </DrawerStack.Navigator>
  );
};

export default HomeStack;
