import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context';
import { COLORS, SIZE } from '../../constants';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import { AvatarCus, InputCus, InputSelect } from '../../components';
import logo from '../../../assets/Images/logo.png';
import { Formik } from 'formik';
import { IconIon } from '../../icons';
import { Picker } from '@react-native-picker/picker';
Register.propTypes = {};
const userSchema = yup.object({
   // email: yup.string().email('Invalid email').required('Required'),
   // password: yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

function Register(props) {
   const { navigation } = props;
   const { theme } = useContext(ThemeContext);
   const [selectedGender, setSelectedGender] = useState();
   const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
      password: '',
      confirmPassword: '',
      country: '',
   };
   const refForm = useRef();
   const state = navigation.getState().routes;
   // const navigation = useNavigation();
   const resultObject = state.reduce((acc, item) => {
      if (item) {
         return { ...acc, ...item.params };
      }
      return acc;
   }, {});
   console.log(resultObject);

   const handleSubmit = (values) => {
      console.log(values);
   };
   const handleSubmitForm = () => {
      refForm.current.handleSubmit();
   };
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
         paddingLeft: 20,
         paddingRight: 20,
         paddingBottom: '20%',
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
         paddingBottom: 40,
         bottom: 0,
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
         <KeyboardAwareScrollView style={{ flex: 1 }} extraScrollHeight={30}>
            <View style={styles.content}>
               {/* <View style={styles.logo}>
                  <AvatarCus size={'xlarge'} circular source={logo} />
               </View> */}
               <Formik
                  innerRef={refForm}
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}>
                  {({
                     setFieldValue,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     values,
                     errors,
                     touched,
                  }) => (
                     <View style={styles.formLogin}>
                        <InputCus
                           onChangeText={handleChange('firstName')}
                           value={values.firstName}
                           onBlur={handleBlur('firstName')}
                           placeholder="Input your first name"
                           label="First Name"
                           name="firstName"
                           error={errors.firstName}
                           touched={touched.firstName}
                        />
                        <InputCus
                           onChangeText={handleChange('lastName')}
                           value={values.lastName}
                           onBlur={handleBlur('lastName')}
                           placeholder="Input your last name"
                           label="Last Name"
                           name="lastName"
                           error={errors.lastName}
                           touched={touched.lastName}
                        />
                        <InputCus
                           onChangeText={handleChange('email')}
                           value={values.email}
                           onBlur={handleBlur('email')}
                           placeholder="Input your email"
                           label="Email"
                           name="email"
                           error={errors.email}
                           touched={touched.email}
                           textContentType="emailAddress"
                        />
                        <InputCus
                           onChangeText={handleChange('phone')}
                           value={values.phone}
                           onBlur={handleBlur('phone')}
                           placeholder="Input your phone"
                           label="Phone"
                           name="phone"
                           error={errors.phone}
                           touched={touched.phone}
                        />

                        <InputSelect
                           setFieldValue={setFieldValue}
                           value={values.gender}
                           onBlur={handleBlur('gender')}
                           placeholder="Select gender..."
                           label="Gender"
                           name="gender"
                           error={errors.gender}
                           touched={touched.gender}
                           items={[
                              { label: 'Male', value: 'male' },
                              { label: 'Female', value: 'female' },
                              { label: 'Other', value: 'other' },
                           ]}
                           defaultValue={0}
                        />
                        <InputCus
                           onChangeText={handleChange('address')}
                           value={values.address}
                           onBlur={handleBlur('address')}
                           placeholder="Input your address"
                           label="Address"
                           name="address"
                           error={errors.address}
                           touched={touched.address}
                        />
                        <InputCus
                           onChangeText={handleChange('password')}
                           value={values.password}
                           onBlur={handleBlur('password')}
                           placeholder="Input your password"
                           label="Password"
                           name="password"
                           error={errors.password}
                           touched={touched.password}
                           secureTextEntry
                           icon={{
                              show: <IconIon name="eye-off" size={20} style={styles.textTheme} />,
                              hide: <IconIon name="eye" size={20} style={styles.textTheme} />,
                           }}
                        />
                        <InputCus
                           onChangeText={handleChange('confirmPassword')}
                           value={values.confirmPassword}
                           onBlur={handleBlur('confirmPassword')}
                           placeholder="Input your confirm password"
                           label="Confirm Password"
                           name="confirmPassword"
                           error={errors.confirmPassword}
                           touched={touched.confirmPassword}
                           secureTextEntry
                           icon={{
                              show: <IconIon name="eye-off" size={20} style={styles.textTheme} />,
                              hide: <IconIon name="eye" size={20} style={styles.textTheme} />,
                           }}
                        />
                        <InputCus
                           onChangeText={handleChange('country')}
                           value={values.country}
                           onBlur={handleBlur('country')}
                           placeholder="Input your country"
                           label="Country"
                           name="country"
                           error={errors.country}
                           touched={touched.country}
                        />
                     </View>
                  )}
               </Formik>
            </View>
         </KeyboardAwareScrollView>
         <View style={styles.registerWrap}>
            <TouchableOpacity style={styles.buttonRegister} onPress={handleSubmitForm}>
               <Text
                  style={{
                     ...styles.textButton,
                     ...styles.textTheme,
                  }}>
                  Register
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

export default Register;
