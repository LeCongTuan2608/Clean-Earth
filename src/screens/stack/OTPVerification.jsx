import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import { ThemeContext } from '../../context';
import { COLORS, SIZE } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { InputCus } from '../../components';
OTPVerification.propTypes = {};
const userSchema = yup.object({
   OTP: yup.string().required('Required'),
});
const initialValues = { OTP: '' };
function OTPVerification(props) {
   const { navigation } = props;
   const { theme } = useContext(ThemeContext);
   const [disable, setDisable] = useState(false);

   const refForm = useRef();
   // function
   const handleSubmit = (values) => {
      console.log(values);
   };
   const handleOTPVerification = () => {
      refForm.current.handleSubmit();
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

      formVerification: {
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
      verificationWrap: {
         position: 'absolute',
         padding: 20,
         bottom: '5%',
         left: 0,
         right: 0,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      buttonVerification: {
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
      <View style={styles.container}>
         <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.content}>
               <Formik
                  innerRef={refForm}
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                     <View style={styles.formVerification}>
                        <InputCus
                           onChangeText={handleChange('OTP')}
                           value={values.OTP}
                           onBlur={handleBlur('OTP')}
                           placeholder="Input your OTP"
                           label="OTP"
                           name="OTP"
                           error={errors.OTP}
                           touched={touched.OTP}
                        />
                     </View>
                  )}
               </Formik>
            </View>
         </KeyboardAwareScrollView>
         <View style={styles.verificationWrap}>
            <TouchableOpacity
               style={disable ? styles.buttonVerification : styles.buttonDisable}
               onPress={handleOTPVerification}>
               <Text
                  style={{
                     ...styles.textButton,
                     ...styles.textTheme,
                  }}>
                  Verification
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

export default OTPVerification;
