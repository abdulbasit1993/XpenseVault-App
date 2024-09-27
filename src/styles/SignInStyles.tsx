import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE, BLACK, PRIMARY} = Colors;

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
  subheadingView: {
    marginTop: 15,
  },
  subheadingText: {
    fontSize: 19,
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
    marginBottom: 20,
  },
  buttonView: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 17,
    color: BLACK,
    lineHeight: 20,
    margin: 0,
    padding: 0,
  },
  signUpText: {
    fontSize: 17,
    color: PRIMARY,
    lineHeight: 20,
    marginLeft: 10,
  },
  forgotPassView: {
    alignItems: 'flex-end',
  },
  forgotPassText: {
    fontSize: 14,
    color: PRIMARY,
  },
});
