import React, { useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../context';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { InputCus } from '../../components';
import { TouchableOpacity } from 'react-native';
import { COLORS, SIZE } from '../../constants';
import * as yup from 'yup';
import { KeyboardAvoidingView } from 'react-native';

import { i18next, languageResources } from '../../service';
const userSchema = yup.object({
   email: yup.string().email('Invalid email').required(i18next.t('errors-input.required')),
});
const initialValues = { email: '' };
ForgotPassword.propTypes = {};
function ForgotPassword(props) {
   const { navigation } = props;
   const { theme } = useContext(ThemeContext);
   const [inputValue, setInputValue] = useState('');
   const [disable, setDisable] = useState(false);
   const refForm = useRef();
   const ref = useRef(null);
   useEffect(() => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setDisable(emailPattern.test(inputValue));
   }, [inputValue]);
   // function
   const handleChangeText = (value) => {
      if (ref.current) {
         clearTimeout(ref.current);
      }
      ref.current = setTimeout(() => {
         setInputValue(value);
      }, 400);
   };
   const handleSubmit = (values) => {
      console.log(values);
   };
   const handleContinue = () => {
      refForm.current.handleSubmit();
      disable && navigation.navigate('OTP-Verification');
   };

   //style
   const styles = StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         color: theme === 'light' ? COLORS.black : COLORS.white,
         position: 'relative',
      },
      content: {
         flex: 1,
         display: 'flex',
         justifyContent: 'space-around',
         paddingTop: 30,
         paddingBottom: 50,
      },

      formForgotPw: {
         flex: 1,
         justifyContent: 'flex-start',
         gap: '30%',
         paddingTop: 40,
         paddingLeft: 20,
         paddingRight: 20,
      },

      textButton: {
         textAlign: 'center',
         fontWeight: 'bold',
         fontSize: SIZE.medium,
         color: COLORS.white,
      },
      continueWrap: {
         position: 'absolute',
         padding: 20,
         bottom: '5%',
         left: 0,
         right: 0,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      buttonContinue: {
         borderRadius: 7,
         padding: 20,
         borderColor: COLORS.blue60,
         borderWidth: 1,
      },
      buttonDisable: {
         borderRadius: 7,
         padding: 20,
         borderColor: COLORS.blue60,
         borderWidth: 1,
         opacity: 0.6,
         backgroundColor: theme === 'light' ? COLORS.gray10 : COLORS.gray80,
      },
      textTheme: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
   });

   return (
      <KeyboardAvoidingView style={styles.container}>
         <View style={styles.container}>
            <View style={styles.content}>
               <Formik
                  innerRef={refForm}
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                     <View style={styles.formForgotPw}>
                        <InputCus
                           onChangeText={(value) => {
                              handleChange('email')(value);
                              handleChangeText(value);
                           }}
                           value={values.email}
                           onBlur={handleBlur('email')}
                           placeholder="Input your email"
                           label="Email"
                           name="email"
                           error={errors.email}
                           touched={touched.email}
                           textContentType="emailAddress"
                        />
                     </View>
                  )}
               </Formik>
            </View>
            <View style={styles.continueWrap}>
               <TouchableOpacity
                  style={disable ? styles.buttonContinue : styles.buttonDisable}
                  onPress={handleContinue}>
                  <Text
                     style={{
                        ...styles.textButton,
                        ...styles.textTheme,
                     }}>
                     Continue
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </KeyboardAvoidingView>
   );
}

export default ForgotPassword;
