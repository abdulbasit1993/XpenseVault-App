import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {Colors} from '../constants/colors';
import AppText from './AppText';

const CODE_LENGTH = 4;

const CodeInput = ({code, setCode}) => {
  const ref = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);

  const BOX_WIDTH = DEVICE_WIDTH * 0.11;
  const BOX_HEIGHT = DEVICE_HEIGHT * 0.075;

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      isFocused && isFocused
        ? {
            ...styles.inputContainer,
            ...styles.inputContainerFocused,
            width: BOX_WIDTH,
            height: BOX_HEIGHT,
          }
        : {...styles.inputContainer, width: BOX_WIDTH, height: BOX_HEIGHT};

    return (
      <View key={idx} style={containerStyle}>
        <AppText style={styles.inputText}>{digit}</AppText>
      </View>
    );
  };

  const handleOnPress = () => {
    setIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={styles.hiddenCodeInput}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  inputsContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: '#cccccc',
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 24,
    color: '#000000',
  },
  inputContainerFocused: {
    borderColor: Colors.PRIMARY,
  },
});

export default CodeInput;
