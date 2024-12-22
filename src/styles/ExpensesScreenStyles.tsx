import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE, BLACK, PRIMARY, RED} = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  headingText: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.BLACK,
  },
});
