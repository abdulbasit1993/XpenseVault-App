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
    marginBottom: 20,
  },
  buttonView: {
    width: '100%',
    marginTop: 65,
    alignItems: 'center',
  },
  errorView: {
    marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: RED,
  },
  timerContainer: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    color: BLACK,
  },
  resendCodeText: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY,
  },
});
