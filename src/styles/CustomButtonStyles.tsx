import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY, WHITE} = Colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    width: '35%',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 17,
    color: WHITE,
  },
});
