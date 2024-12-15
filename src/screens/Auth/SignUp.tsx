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

const SignUp = () => {
  const navigation = useNavigation();

  const [signUp, {isLoading: isSignUpLoading}] = useSignUpMutation();

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
    <View style={styles.container}>
      <FullScreenLoader loading={isLoading} />
      <Header title="Sign Up" />

      <ScrollView>
        <View style={styles.subcontainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>
              Welcome to <Text style={styles.boldText}>XpenseVault!</Text>
            </Text>

            <View style={styles.subheadingView}>
              <Text style={styles.subheadingText}>
                Create your account to continue to{' '}
                <Text style={styles.boldText}>XpenseVault</Text>
              </Text>
            </View>
          </View>

          <View style={styles.formView}>
            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Full Name:</Text>
              </View>
              <CustomInput
                value={signUpFormData.name}
                onChangeText={text => handleInputChange('name', text)}
                placeholder={'Enter Your Full Name'}
              />

              {errors.nameError && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{errors.nameError}</Text>
                </View>
              )}
            </View>

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Email:</Text>
              </View>
              <CustomInput
                value={signUpFormData.email}
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
              <CustomPasswordInput
                value={signUpFormData.password}
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

            <View style={styles.formFieldView}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Confirm Password:</Text>
              </View>
              <CustomPasswordInput
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
                title="Sign Up"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>

            <View style={styles.footerView}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signUpText}>Sign In Here</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
