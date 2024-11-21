import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {BLACK} = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 30,
    color: BLACK,
  },
  loadingContainer: {
    marginTop: 15,
  },
});
