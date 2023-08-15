import React, { useContext, useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { COLORS, SIZE } from '../constants';
import { ThemeContext } from '../context';
import { IconAnt } from '../icons';
import OutsidePressHandler from 'react-native-outside-press';

InputCus.propTypes = {};

function InputCus(props) {
   const { theme } = useContext(ThemeContext);
   const {
      //    text
      label = false,
      labelStyle = {},
      inputStyle = {},
      //   property
      name = undefined,
      onBlur = undefined,
      onChangeText = undefined,
      value = '',
      placeholder = undefined,
      onFocus = undefined,
      onChange = undefined,
      secureTextEntry = false,
      textContentType = undefined,
      //icon
      icon = undefined,
      //   errors
      styleError = {},
      error = undefined,
      touched = undefined,
   } = props;
   const [show, setShow] = useState(secureTextEntry);
   const showPassword = () => {
      setShow(!show);
   };
   const styles = StyleSheet.create({
      container: {
         position: 'relative',
         zIndex: 1,
      },
      content: {
         display: 'flex',
         paddingTop: 5,
         paddingBottom: 5,
      },
      inputGroup: {
         position: 'relative',
      },
      icon: {
         position: 'absolute',
         right: 10,
         top: '25%',
         bottom: '25%',
      },
      labelStyle: {
         paddingLeft: 1,
         paddingRight: 1,
         fontWeight: 'bold',
         color: theme === 'light' ? COLORS.gray45 : COLORS.gray30,
      },
      inputStyle: {
         paddingTop: 5,
         paddingBottom: 10,
         paddingLeft: 1,
         paddingRight: 1,
         borderBottomWidth: 1,
         borderRadius: 3,
         fontWeight: '500',
         borderBottomColor: COLORS.gray20,
         color: theme === 'light' ? COLORS.gray90 : COLORS.gray00,
      },
      textError: {
         color: theme === 'light' ? COLORS.red500 : COLORS.red500,
         paddingTop: 10,
      },
   });
   return (
      <View style={styles.container}>
         <View>
            {label && <Text style={{ ...styles.labelStyle, ...labelStyle }}>{label}</Text>}
            <OutsidePressHandler
               onOutsidePress={() => {
                  Keyboard.dismiss();
               }}>
               <View style={styles.inputGroup}>
                  <TextInput
                     style={{ ...styles.inputStyle, ...inputStyle }}
                     name={name}
                     value={value}
                     onBlur={onBlur}
                     onChangeText={onChangeText}
                     placeholder={placeholder}
                     onFocus={onFocus}
                     onChange={onChange}
                     textContentType={textContentType}
                     secureTextEntry={show}
                     placeholderTextColor={theme === 'light' ? COLORS.gray45 : COLORS.gray45}
                  />
                  {icon !== undefined && (
                     <TouchableOpacity style={styles.icon} onPress={showPassword}>
                        {show ? icon?.show : icon?.hide}
                     </TouchableOpacity>
                  )}
               </View>
            </OutsidePressHandler>

            {touched && error && (
               <Text style={{ ...styles.textError, ...styleError }}>{error}</Text>
            )}
         </View>
      </View>
   );
}

export default InputCus;
