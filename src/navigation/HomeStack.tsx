import {CustomDrawer} from '../components/CustomDrawer';
import {Colors} from '../constants/colors';
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
    </DrawerStack.Navigator>
  );
};

export default HomeStack;
