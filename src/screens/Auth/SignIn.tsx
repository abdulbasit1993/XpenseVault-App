import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../../styles/SignInStyles';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('handleSubmit called...');
  };

  return (
    <View style={styles.container}>
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
            <CustomInput placeholder={'Enter Your Email'} />
          </View>

          <View style={styles.formFieldView}>
            <View style={styles.labelView}>
              <Text style={styles.label}>Password:</Text>
            </View>
            <CustomInput placeholder={'Enter Your Password'} type="password" />
          </View>

          <View style={styles.forgotPassView}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </View>

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
    </View>
  );
};

export default SignIn;
