import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {styles} from '../../styles/ForgotPasswordStyles';
import FullScreenLoader from '../../components/FullScreenLoader';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {validateEmail} from '../../utils/validations';
import {useForgotPasswordMutation} from '../../redux/services';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../contexts/ToastContext';
import {useSelector} from 'react-redux';
import {Colors} from '../../constants/colors';
import AppText from '../../components/AppText';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const [forgotPassFormData, setForgotPassFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
  });

  const {showToast} = useToast();

  const handleInputChange = (key, value) => {
    setForgotPassFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const emailError = validateEmail(forgotPassFormData.email);

    setErrors({
      emailError: emailError,
    });

    if (!emailError) {
      try {
        const forgotPassResponse = await forgotPassword(
          forgotPassFormData,
        ).unwrap();

        if (forgotPassResponse?.success) {
          const {message} = forgotPassResponse;
          showToast(message, 'success');
          navigation.navigate('EmailVerification', {
            email: forgotPassFormData.email,
          });
        }
      } catch (error) {
        console.log('Error forgotPassword : ', error);

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
      <FullScreenLoader loading={isLoading} />
      <Header title="Forgot Password" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <AppText style={styles.headingText}>
            Enter Your Email to Proceed to Reset Your Password
          </AppText>
        </View>

        <View style={styles.formView}>
          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <AppText style={styles.label}>Email:</AppText>
            </View>
            <CustomInput
              value={forgotPassFormData.email}
              onChangeText={text => handleInputChange('email', text)}
              placeholder={'Enter Your Email'}
              customInputStyles={{
                color: isDarkMode ? Colors.WHITE : Colors.BLACK,
              }}
            />

            {errors.emailError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.emailError}</Text>
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
    </View>
  );
};

export default ForgotPassword;
