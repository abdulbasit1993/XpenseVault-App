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
  topTabsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 15,
    width: '47%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFocused: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: '47%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonText: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  tabButtonTextFocused: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});
