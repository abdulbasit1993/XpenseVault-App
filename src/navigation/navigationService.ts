import {CommonActions, useNavigation} from '@react-navigation/native';

export const resetStack = (navigation, route) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: route}],
    }),
  );
};
