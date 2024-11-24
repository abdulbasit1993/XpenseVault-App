import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY} = Colors;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 90,
  },
});
