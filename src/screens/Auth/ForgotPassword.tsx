import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {styles} from '../../styles/ForgotPasswordStyles';
import FullScreenLoader from '../../components/FullScreenLoader';
import Header from '../../components/Header';
import CustomToast from '../../components/CustomToast';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {validateEmail} from '../../utils/validations';
import {useForgotPasswordMutation} from '../../redux/services';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const [forgotPassFormData, setForgotPassFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
  });

  const [toast, setToast] = useState({visible: false, message: '', type: ''});

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

        console.log('forgotPassResponse : ', forgotPassResponse);

        if (forgotPassResponse?.success) {
          const {message} = forgotPassResponse;
          setToast({visible: true, message: message, type: 'success'});
        }
      } catch (error) {
        console.log('Error forgotPassword : ', error);

        const {
          data: {message},
        } = error;

        setToast({visible: true, message: message, type: 'error'});
      }
    }
  };

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isLoading} />
      <Header title="Forgot Password" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Enter Your Email to Proceed to Reset Your Password
          </Text>
        </View>

        <View style={styles.formView}>
          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <CustomInput
              value={forgotPassFormData.email}
              onChangeText={text => handleInputChange('email', text)}
              placeholder={'Enter Your Email'}
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

export default ForgotPassword;
