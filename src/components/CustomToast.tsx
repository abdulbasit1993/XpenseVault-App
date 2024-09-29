import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Colors} from '../constants/colors';

const {BLACK, WHITE} = Colors;

const CustomToast = ({
  setToast,
  message = 'Toast launched successfully',
  type = 'success',
}) => {
  const bottom = React.useRef(new Animated.Value(-80)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  function animate() {
    Animated.sequence([
      Animated.timing(bottom, {
        toValue: 20,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.delay(1100),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setToast(false);
    });
  }

  const title = type === 'success' ? 'SUCCESS!' : 'ERROR!';
  const icon = type === 'success' ? '✅' : '❌';

  React.useEffect(() => {
    animate();
  }, []);

  return (
    <Animated.View style={[styles.container, {bottom, opacity}]}>
      <Text style={{color: WHITE, fontSize: 25}}>{icon}</Text>
      <View style={styles.rightContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BLACK,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 999999,
  },
  rightContainer: {
    marginLeft: 12,
  },
  titleText: {
    fontWeight: 'bold',
    color: WHITE,
  },
  messageText: {
    fontSize: 15,
    color: WHITE,
  },
});

export default CustomToast;
