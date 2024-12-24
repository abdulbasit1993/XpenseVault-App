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
  inputView: {
    width: '88%',
  },

  input: {
    color: BLACK,
  },
  eyeIconView: {
    width: '10%',
  },
});
