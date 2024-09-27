import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY, WHITE} = Colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: WHITE,
  },
});
