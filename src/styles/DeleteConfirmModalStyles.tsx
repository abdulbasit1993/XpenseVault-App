import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
  },
  container: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  titleView: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  contentText: {
    fontSize: 19,
    fontWeight: '500',
    color: Colors.BLACK,
    textAlign: 'center',
  },
  contentView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
