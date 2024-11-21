import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY, WHITE} = Colors;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftView: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: WHITE,
  },
  rightView: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
