import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   Text,
   View,
   ScrollView,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   Alert,
   KeyboardAvoidingView,
} from 'react-native';
import { AvatarCus, InputCus } from '../../components';
import avatar from '../../../assets/Images/avatar.jpg';
import { COLORS, SIZE } from '../../constants';
import { IconAnt, IconAwesome } from '../../icons';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as yup from 'yup';
import { Input } from '@rneui/themed';
import { ThemeContext } from '../../context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

const userSchema = yup.object({
   name: yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('Required'),
   email: yup.string().email('Invalid email').required('Required'),
   phone: yup.string().min(5, 'Too Short!').max(10, 'Too Long!').required('Required'),
   addr: yup.string().min(5, 'Too Short!').max(100, 'Too Long!').required('Required'),
});

Profile.propTypes = {};

function Profile(props) {
   const { navigation } = props;
   const { theme } = useContext(ThemeContext);
   const refForm = useRef();
   const refScroll = useRef();
   // console.log('navigation:', navigation);
   const initialValues = {
      name: 'Le Cong Tuan',
      email: 'lctuan.dev@gmail.com',
      phone: '0377969735',
      addr: '236 Man Thien, Quan 9',
   };
   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });
      console.log(result);

      // if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      // }
   };

   const handleSubmit = (values) => {
      // console.log('values:', values);
      return values;
   };
   const onPressUpdate = () => {
      if (refForm.current) {
         refForm.current.handleSubmit();
      }
   };
   const styles = StyleSheet.create({
      wrap: {
         flex: 1,
         position: 'relative',
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      container: {
         flex: 1,
      },
      content: {
         marginTop: 20,
      },
      avatar: {
         display: 'flex',
         alignItems: 'center',
         position: 'relative',
      },
      iconCamera: {
         position: 'absolute',
         bottom: 0,
         right: 0,
         backgroundColor: COLORS.gray10,
         padding: 6,
         borderRadius: 100,
      },
      form: {
         paddingLeft: 20,
         paddingRight: 20,
         marginTop: 30,
         display: 'flex',
         gap: 40,
      },

      bottomTab: {
         position: 'absolute',
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         bottom: 0,
         right: 0,
         left: 0,
         height: 120,
         display: 'flex',
         justifyContent: 'flex-start',
         paddingLeft: 20,
         paddingRight: 20,
      },
      buttonWrap: {
         position: 'relative',
         marginTop: 15,
         padding: 10,
         borderRadius: 7,
         backgroundColor: COLORS.blue60,
         zIndex: 100,
      },
      button: {
         padding: 10,
         display: 'flex',
         alignItems: 'center',
      },
      buttonText: {
         fontWeight: 'bold',
         fontSize: SIZE.medium,
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
   });
   return (
      <View style={styles.wrap}>
         <KeyboardAwareScrollView ref={refScroll} extraScrollHeight={30}>
            <View style={styles.content}>
               <View style={styles.avatar}>
                  <View>
                     <AvatarCus source={avatar} circular size={140} />
                     <TouchableOpacity style={styles.iconCamera} onPress={pickImage}>
                        <IconAwesome name="camera" size={SIZE.large} />
                     </TouchableOpacity>
                  </View>
               </View>
               <Formik
                  innerRef={refForm}
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                     <View style={styles.form}>
                        <InputCus
                           onChangeText={handleChange('name')}
                           value={values.name}
                           onBlur={handleBlur('name')}
                           placeholder="Full name"
                           label="Full Name"
                           name="name"
                           error={errors.name}
                           touched={touched.name}
                        />
                        <InputCus
                           onChangeText={handleChange('email')}
                           value={values.email}
                           onBlur={handleBlur('email')}
                           placeholder="Email"
                           label="Email"
                           name="email"
                           error={errors.email}
                           touched={touched.email}
                        />
                        <InputCus
                           onChangeText={handleChange('phone')}
                           value={values.phone}
                           onBlur={handleBlur('phone')}
                           placeholder="Phone"
                           label="Phone"
                           name="phone"
                           error={errors.phone}
                           touched={touched.phone}
                        />
                        <InputCus
                           onChangeText={handleChange('phone')}
                           value={values.phone}
                           onBlur={handleBlur('phone')}
                           placeholder="Phone"
                           label="Phone"
                           name="phone"
                           error={errors.phone}
                           touched={touched.phone}
                        />
                        <InputCus
                           onChangeText={handleChange('addr')}
                           value={values.addr}
                           onBlur={handleBlur('addr')}
                           placeholder="Address"
                           label="Address"
                           name="addr"
                           error={errors.addr}
                           touched={touched.addr}
                        />
                     </View>
                  )}
               </Formik>
            </View>
         </KeyboardAwareScrollView>
         <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.buttonWrap} onPress={onPressUpdate}>
               <View style={styles.button}>
                  <Text style={styles.buttonText}>Update</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
}

export default Profile;
