import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../constants/colors';

const {WHITE} = Colors;

const FullScreenLoader = ({loading}: {loading: boolean}) => {
  if (loading) {
    return (
      <View style={styles.wrapper} pointerEvents="auto">
        <ActivityIndicator size={'large'} color={WHITE} />
        <Text style={styles.indicatorText}>Loading...</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999999,
  },
  indicatorText: {
    fontSize: 17,
    marginTop: 12,
    color: WHITE,
  },
});

export default FullScreenLoader;
