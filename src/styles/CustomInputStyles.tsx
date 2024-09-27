import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {PRIMARY, WHITE, BLACK} = Colors;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderWidth: 3,
    borderColor: PRIMARY,
    borderRadius: 10,
    width: '100%',
  },
  input: {
    width: '100%',
  },
});
