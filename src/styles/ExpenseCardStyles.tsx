import {StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.WHITE,
    width: '97%',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleView: {
    width: '100%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.PRIMARY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
