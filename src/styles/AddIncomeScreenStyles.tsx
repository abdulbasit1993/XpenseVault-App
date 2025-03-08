import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE, BLACK, PRIMARY, RED} = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    paddingVertical: 18,
  },
  titleText: {
    fontSize: 19,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  formView: {
    marginTop: 5,
  },
  label: {
    color: PRIMARY,
    fontSize: 18,
  },
  labelView: {
    marginBottom: 10,
  },
  formFieldView: {
    marginBottom: 15,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderWidth: 3,
    borderColor: PRIMARY,
    borderRadius: 10,
    width: '100%',
  },
  dateText: {
    fontSize: 15,
    color: '#999',
  },
  errorView: {
    marginBottom: 15,
  },
  errorText: {
    fontSize: 14,
    color: RED,
  },
});
