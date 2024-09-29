import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import CustomToast from '../../components/CustomToast';
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

const ResetPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    params: {email},
  } = route;

  const [resetPassword, {isLoading: isResetPasswordLoading}] =
    useResetPasswordMutation();

  const [errors, setErrors] = useState({
    passwordError: '',
    confirmPasswordError: '',
  });

  const [toast, setToast] = useState({visible: false, message: '', type: ''});

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
          setToast({visible: true, message: message, type: 'success'});
        }
      } catch (error) {
        const {
          data: {message},
        } = error;

        setToast({visible: true, message: message, type: 'error'});
      }
    }
  };

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isResetPasswordLoading} />
      <Header title="Reset Password" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {`Enter Your New Password for \n ${email}`}
          </Text>
        </View>

        <View style={styles.formFieldView}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Password:</Text>
          </View>
          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Enter Your Password'}
            type="password"
          />

          {errors.passwordError && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{errors.passwordError}</Text>
            </View>
          )}
        </View>

        <View style={styles.formFieldView}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Confirm Password:</Text>
          </View>
          <CustomInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder={'Re-enter Your Password'}
            type="password"
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

      {toast.visible && (
        <CustomToast
          setToast={visible => setToast({...toast, visible})}
          message={toast.message}
          type={toast.type}
        />
      )}
    </View>
  );
};

export default ResetPassword;
