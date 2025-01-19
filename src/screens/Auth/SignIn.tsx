import React, {useState} from 'react';
import {View, Text, Pressable, Keyboard, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/SignInStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {validateEmail, validatePassword} from '../../utils/validations';
import {useSignInMutation} from '../../redux/services';
import FullScreenLoader from '../../components/FullScreenLoader';
import {useToast} from '../../contexts/ToastContext';
import {storeData} from '../../utils/storageService';
import {resetStack} from '../../navigation/navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {setError, setLoading, setUser} from '../../redux/slices/authSlice';
import {Colors} from '../../constants/colors';
import AppText from '../../components/AppText';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [signIn, {isLoading}] = useSignInMutation();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const {showToast} = useToast();

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
        dispatch(setLoading(true));
        const signInResponse = await signIn(signInFormData).unwrap();

        console.log(
          'response sign in : ',
          JSON.stringify(signInResponse, null, 2),
        );

        if (signInResponse?.success) {
          const {message, user_token, data} = signInResponse;
          await storeData('token', user_token);
          dispatch(setUser(data));
          dispatch(setError(null));
          showToast(message, 'success');
          resetStack(navigation, 'HomeStack');
        }
      } catch (error) {
        console.log('Error signIn : ', error);
        dispatch(setError(error?.message));
        const {
          data: {message},
        } = error;

        showToast(message, 'error');
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      return;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.BLACK : Colors.WHITE},
      ]}>
      <FullScreenLoader loading={isLoading} />
      <Header title="Sign In" themeSwitch />

      <View style={styles.subcontainer}>
        <View style={styles.headingContainer}>
          <AppText style={styles.headingText}>
            Welcome to <AppText style={styles.boldText}>XpenseVault!</AppText>
          </AppText>

          <View style={styles.subheadingView}>
            <AppText style={styles.subheadingText}>
              Please sign in to continue to{' '}
              <AppText style={styles.boldText}>XpenseVault</AppText>
            </AppText>
          </View>
        </View>

        <View style={styles.formView}>
          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <AppText style={styles.label}>Email:</AppText>
            </View>
            <CustomInput
              value={signInFormData.email}
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

          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <AppText style={styles.label}>Password:</AppText>
            </View>
            <CustomPasswordInput
              value={signInFormData.password}
              onChangeText={text => handleInputChange('password', text)}
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

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassView}>
            <AppText style={styles.forgotPassText}>Forgot Password?</AppText>
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
            <AppText style={styles.footerText}>Don't have an account?</AppText>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <AppText style={styles.signUpText}>Sign Up Here</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
