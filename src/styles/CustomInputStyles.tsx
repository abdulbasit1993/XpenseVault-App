import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY, WHITE, BLACK} = Colors;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: PRIMARY,
    borderRadius: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    color: BLACK,
    textAlign: 'left',
  },
});
