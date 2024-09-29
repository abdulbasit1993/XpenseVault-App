import React, {useState} from 'react';
import {View, Text, Pressable, Keyboard, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/SignInStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {validateEmail, validatePassword} from '../../utils/validations';
import {useSignInMutation} from '../../redux/services';
import FullScreenLoader from '../../components/FullScreenLoader';
import CustomToast from '../../components/CustomToast';

const SignIn = () => {
  const navigation = useNavigation();

  const [signIn, {isLoading}] = useSignInMutation();

  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const [toast, setToast] = useState({visible: false, message: '', type: ''});

  const handleInputChange = (key, value) => {
    setSignInFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const emailError = validateEmail(signInFormData.email);
    const passwordError = validatePassword(signInFormData.password);

    setErrors({
      emailError: emailError,
      passwordError: passwordError,
    });

    if (!emailError && !passwordError) {
      try {
        const signInResponse = await signIn(signInFormData).unwrap();

        if (signInResponse?.success) {
          const {message} = signInResponse;
          setToast({visible: true, message: message, type: 'success'});
        }
      } catch (error) {
        console.log('Error signIn : ', error);
        const {
          data: {message},
        } = error;

        setToast({visible: true, message: message, type: 'error'});
      }
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <FullScreenLoader loading={isLoading} />
      <Header title="Sign In" />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Welcome to <Text style={styles.boldText}>XpenseVault!</Text>
          </Text>

          <View style={styles.subheadingView}>
            <Text style={styles.subheadingText}>
              Please sign in to continue to{' '}
              <Text style={styles.boldText}>XpenseVault</Text>
            </Text>
          </View>
        </View>

        <View style={styles.formView}>
          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <CustomInput
              value={signInFormData.email}
              onChangeText={text => handleInputChange('email', text)}
              placeholder={'Enter Your Email'}
            />

            {errors.emailError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.emailError}</Text>
              </View>
            )}
          </View>

          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <Text style={styles.label}>Password:</Text>
            </View>
            <CustomInput
              value={signInFormData.password}
              onChangeText={text => handleInputChange('password', text)}
              placeholder={'Enter Your Password'}
              type="password"
            />

            {errors.passwordError && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.passwordError}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassView}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.buttonView}>
            <CustomButton
              title="Sign In"
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>

          <View style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up Here</Text>
            </Pressable>
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

export default SignIn;
