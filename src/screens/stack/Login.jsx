import React, { useContext, useRef } from 'react';
import {
   Button,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   KeyboardAvoidingView,
} from 'react-native';
import { COLORS, SIZE } from '../../constants';
import { CheckedLoginContext, ThemeContext } from '../../context';
import { AvatarCus, HeaderNav, InputCus } from '../../components';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import logo from '../../../assets/Images/logo.png';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { IconAnt, IconIon } from '../../icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { languageResources, i18next } from '../../service';

Login.propTypes = {};

function Login(props) {
   const { navigation } = props;
   const { t } = useTranslation();
   const { theme } = useContext(ThemeContext);
   const { setLogin } = useContext(CheckedLoginContext);
   const refForm = useRef();
   const initialValues = { email: '', password: '' };
   // function
   const handleSubmit = (values) => {
      console.log(values);
   };
   //validate form
   const userSchema = yup.object({
      email: yup
         .string()
         .email(t('errors-input.invalid-email'))
         .required(t('errors-input.required')),
      password: yup
         .string()
         .min(5, 'Too Short!')
         .max(50, 'Too Long!')
         .required(t('errors-input.required')),
   });
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
      logo: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: '30%',
         padding: 30,
      },
      formLogin: {
         flex: 1,
         justifyContent: 'flex-start',
         gap: '30%',
         paddingTop: 40,
         paddingLeft: 20,
         paddingRight: 20,
      },
      buttonWrap: { display: 'flex', gap: 20 },
      buttonLogin: {
         backgroundColor: COLORS.blue60,
         borderRadius: 7,
         padding: 20,
      },

      textButton: {
         textAlign: 'center',
         fontWeight: 'bold',
         fontSize: SIZE.medium,
         color: COLORS.white,
      },
      registerWrap: {
         position: 'absolute',
         padding: 20,
         bottom: '5%',
         left: 0,
         right: 0,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         // paddingBottom: 60,
      },
      buttonRegister: {
         borderRadius: 7,
         padding: 20,
         borderColor: COLORS.blue60,
         borderWidth: 1,
      },
      textTheme: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
   });
   return (
      <View style={styles.container}>
         <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.content}>
               <View style={styles.logo}>
                  <AvatarCus size={'xlarge'} circular source={logo} />
               </View>
               <Formik
                  innerRef={refForm}
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                     <View style={styles.formLogin}>
                        <InputCus
                           onChangeText={handleChange('email')}
                           value={values.email}
                           onBlur={handleBlur('email')}
                           placeholder={t('login.placeholder-email')}
                           label={t('login.label-email')}
                           name="email"
                           error={errors.email}
                           touched={touched.email}
                           textContentType="emailAddress"
                        />
                        <InputCus
                           onChangeText={handleChange('password')}
                           value={values.password}
                           onBlur={handleBlur('password')}
                           placeholder={t('login.placeholder-password')}
                           label={t('login.label-password')}
                           name="password"
                           error={errors.password}
                           touched={touched.password}
                           secureTextEntry
                           textContentType="password"
                           icon={{
                              show: <IconIon name="eye-off" size={20} style={styles.textTheme} />,
                              hide: <IconIon name="eye" size={20} style={styles.textTheme} />,
                           }}
                        />
                        <View style={styles.buttonWrap}>
                           <TouchableOpacity
                              style={styles.buttonLogin}
                              onPress={() => setLogin(true)}>
                              <Text style={styles.textButton}> {t('login.button-login')}</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => navigation.navigate('Forgot-Password')}>
                              <Text style={{ ...styles.textButton, color: COLORS.blue60 }}>
                                 {t('login.forgot-password')}
                              </Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  )}
               </Formik>
            </View>
         </KeyboardAwareScrollView>
         <View style={styles.registerWrap}>
            <TouchableOpacity
               style={styles.buttonRegister}
               onPress={() => navigation.navigate('Register', { text: 'data form 1' })}>
               <Text
                  style={{
                     ...styles.textButton,
                     ...styles.textTheme,
                  }}>
                  {t('login.button-register')}
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

export default Login;
