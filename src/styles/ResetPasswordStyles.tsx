import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE, BLACK, PRIMARY, RED} = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subcontainer: {
    marginHorizontal: 15,
  },
  headingContainer: {
    marginTop: 25,
  },
  headingText: {
    fontSize: 22,
    color: BLACK,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '700',
  },
  formView: {
    marginTop: 35,
  },
  label: {
    color: PRIMARY,
    fontSize: 18,
  },
  labelView: {
    marginBottom: 10,
  },
  formFieldView: {
    marginTop: 35,
  },
  buttonView: {
    width: '100%',
    marginTop: 55,
    alignItems: 'center',
  },
  errorView: {
    marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: RED,
  },
});
