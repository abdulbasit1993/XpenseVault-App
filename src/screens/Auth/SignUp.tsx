import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {styles} from '../../styles/SignUpStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import {useNavigation} from '@react-navigation/native';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validations';
import FullScreenLoader from '../../components/FullScreenLoader';
import {useSignUpMutation} from '../../redux/services';
import {useToast} from '../../contexts/ToastContext';
import {storeData} from '../../utils/storageService';
import {resetStack} from '../../navigation/navigationService';
import {useSelector} from 'react-redux';
import {Colors} from '../../constants/colors';
import AppText from '../../components/AppText';

const SignUp = () => {
  const navigation = useNavigation();

  const [signUp, {isLoading: isSignUpLoading}] = useSignUpMutation();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {showToast} = useToast();

  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    nameError: '',
    confirmPasswordError: '',
  });

  const handleInputChange = (key, value) => {
    setSignUpFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const nameError = validateName(signUpFormData.name);
    const emailError = validateEmail(signUpFormData.email);
    const passwordError = validatePassword(signUpFormData.password);
    const confirmPassError = validateConfirmPassword(
      signUpFormData.password,
      confirmPassword,
    );

    setErrors({
      emailError: emailError,
      passwordError: passwordError,
      nameError: nameError,
      confirmPasswordError: confirmPassError,
    });

    if (!nameError && !emailError && !passwordError && !confirmPassError) {
      setIsLoading(true);

      try {
        const signUpResponse = await signUp(signUpFormData).unwrap();

        if (signUpResponse?.success) {
          setIsLoading(false);
          const {message, user_token} = signUpResponse;
          await storeData('token', user_token);
          showToast(message, 'success');
          resetStack(navigation, 'HomeStack');
        }
      } catch (error) {
        console.log('Error signUp : ', error);

        const {
          data: {message},
        } = error;

        showToast(message, 'error');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
      <Header title="Sign Up" themeSwitch />

      <ScrollView>
        <View style={styles.subcontainer}>
          <View style={styles.headingContainer}>
            <AppText style={styles.headingText}>
              Welcome to <AppText style={styles.boldText}>XpenseVault!</AppText>
            </AppText>

            <View style={styles.subheadingView}>
              <AppText style={styles.subheadingText}>
                Create your account to continue to{' '}
                <AppText style={styles.boldText}>XpenseVault</AppText>
              </AppText>
            </View>
          </View>

          <View style={styles.formView}>
            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <AppText style={styles.label}>Full Name:</AppText>
              </View>
              <CustomInput
                value={signUpFormData.name}
                onChangeText={text => handleInputChange('name', text)}
                placeholder={'Enter Your Full Name'}
                customInputStyles={{
                  color: isDarkMode ? Colors.WHITE : Colors.BLACK,
                }}
              />

              {errors.nameError && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{errors.nameError}</Text>
                </View>
              )}
            </View>

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <AppText style={styles.label}>Email:</AppText>
              </View>
              <CustomInput
                value={signUpFormData.email}
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
                value={signUpFormData.password}
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

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <AppText style={styles.label}>Confirm Password:</AppText>
              </View>
              <CustomPasswordInput
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
                title="Sign Up"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>

            <View style={styles.footerView}>
              <AppText style={styles.footerText}>
                Already have an account?
              </AppText>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <AppText style={styles.signUpText}>Sign In Here</AppText>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
