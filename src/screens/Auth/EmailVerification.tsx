import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import FullScreenLoader from '../../components/FullScreenLoader';
import Header from '../../components/Header';
import {styles} from '../../styles/EmailVerificationStyles';
import CodeInput from '../../components/CodeInput';
import {
  useForgotPasswordMutation,
  useValidateOTPMutation,
} from '../../redux/services';
import {useToast} from '../../contexts/ToastContext';

const EmailVerification = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    params: {email},
  } = route;

  const [forgotPassword, {isLoading: isForgotPasswordLoading}] =
    useForgotPasswordMutation();
  const [validateOTP, {isLoading: isValidateOTPloading}] =
    useValidateOTPMutation();

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(360);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const {showToast} = useToast();

  const handleResendCode = async () => {
    try {
      const payload = {
        email: email,
      };

      const forgotPassResponse = await forgotPassword(payload).unwrap();

      if (forgotPassResponse?.success) {
        const {message} = forgotPassResponse;
        showToast(message, 'success');
        setTimer(360);
        setIsResendDisabled(true);
      }
    } catch (error) {
      const {
        data: {message},
      } = error;

      showToast(message, 'error');
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!code) {
      return showToast('Please enter code first', 'error');
    }

    const payload = {
      email: email,
      otp: code,
    };

    try {
      const validateOTPResponse = await validateOTP(payload).unwrap();

      if (validateOTPResponse?.success) {
        const {message} = validateOTPResponse;
        showToast(message, 'success');

        navigation.navigate('ResetPassword', {email: email});
      }
    } catch (error) {
      const {
        data: {message},
      } = error;

      showToast(message, 'error');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  return (
    <View style={styles.container}>
      <FullScreenLoader
        loading={isValidateOTPloading || isForgotPasswordLoading}
      />
      <Header title="Email Verification" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {`A 4-digit OTP Code has been sent to ${email}. \nPlease enter it below to continue resetting your password.`}
          </Text>
        </View>

        <View style={styles.formView}>
          <CodeInput code={code} setCode={setCode} />

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text
                style={
                  styles.timerText
                }>{`Resend code in ${formatTime()}`}</Text>
            ) : (
              <Pressable onPress={() => handleResendCode()}>
                <Text style={styles.resendCodeText}>Resend Code</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.buttonView}>
            <CustomButton
              title="Submit"
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmailVerification;
