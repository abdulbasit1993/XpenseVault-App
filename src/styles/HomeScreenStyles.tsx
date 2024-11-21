import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE, BLACK, PRIMARY, RED} = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  titleText: {
    fontSize: 19,
    fontWeight: '600',
    color: Colors.BLACK,
  },
});
