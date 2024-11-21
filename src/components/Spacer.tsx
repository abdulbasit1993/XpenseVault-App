import React from 'react';
import {View, StyleSheet} from 'react-native';

interface SpacerProps {
  mT?: number;
  mB?: number;
  mL?: number;
  mR?: number;
}

const Spacer: React.FC<SpacerProps> = ({mT = 0, mB = 0, mL = 0, mR = 0}) => {
  return (
    <View
      style={[
        styles.spacer,
        {marginTop: mT, marginBottom: mB, marginLeft: mL, marginRight: mR},
      ]}></View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    width: 0,
    height: 0,
  },
});

export default Spacer;
