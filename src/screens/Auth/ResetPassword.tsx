import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import FullScreenLoader from '../../components/FullScreenLoader';
import Header from '../../components/Header';
import {styles} from '../../styles/ResetPasswordStyles';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validations';
import {useResetPasswordMutation} from '../../redux/services';
import {useToast} from '../../contexts/ToastContext';
import {useSelector} from 'react-redux';
import {Colors} from '../../constants/colors';
import AppText from '../../components/AppText';

const ResetPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const {
    params: {email},
  } = route;

  const [resetPassword, {isLoading: isResetPasswordLoading}] =
    useResetPasswordMutation();

  const [errors, setErrors] = useState({
    passwordError: '',
    confirmPasswordError: '',
  });

  const {showToast} = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const passwordError = validatePassword(password);
    const confirmPassError = validateConfirmPassword(password, confirmPassword);

    setErrors({
      passwordError: passwordError,
      confirmPasswordError: confirmPassError,
    });

    const payload = {
      email: email,
      newPassword: password,
    };

    if (!passwordError && !confirmPassError) {
      try {
        const response = await resetPassword(payload).unwrap();

        if (response?.success) {
          const {message} = response;
          showToast(message, 'success');
        }
      } catch (error) {
        const {
          data: {message},
        } = error;

        showToast(message, 'error');
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.BLACK : Colors.WHITE},
      ]}>
      <FullScreenLoader loading={isResetPasswordLoading} />
      <Header title="Reset Password" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <AppText style={styles.headingText}>
            {`Enter Your New Password for \n ${email}`}
          </AppText>
        </View>

        <View style={styles.formFieldView}>
          <View style={styles.labelView}>
            <AppText style={styles.label}>Password:</AppText>
          </View>
          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Enter Your Password'}
            type="password"
            customInputStyles={{
              color: isDarkMode ? Colors.WHITE : Colors.BLACK,
            }}
          />

          {errors.passwordError && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{errors.passwordError}</Text>
            </View>
          )}
        </View>

        <View style={styles.formFieldView}>
          <View style={styles.labelView}>
            <AppText style={styles.label}>Confirm Password:</AppText>
          </View>
          <CustomInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder={'Re-enter Your Password'}
            type="password"
            customInputStyles={{
              color: isDarkMode ? Colors.WHITE : Colors.BLACK,
            }}
          />

          {errors.confirmPasswordError && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>
                {errors.confirmPasswordError}
              </Text>
            </View>
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
  );
};

export default ResetPassword;
