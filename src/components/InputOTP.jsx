import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import { ThemeContext } from '../context';
import { COLORS } from '../constants';

InputOTP.propTypes = {};

function InputOTP(props) {
   const { theme } = useContext(ThemeContext);
   const {
      //    text
      label = false,
      labelStyle = {},
      inputStyle = {},
      boxOTPStyle = {},
      textOTPStyle = {},
      //   property
      name = undefined,
      keyboardType = 'numeric',
      onBlur = undefined,
      onChangeText = undefined,
      value = '',
      onFocus = undefined,
      onChange = undefined,
      //
      code,
      length = 4,
      //   errors
      styleError = {},
      error = undefined,
      touched = undefined,
   } = props;
   const [inputValue, setInputValue] = useState(value);
   const [boxArray, setBoxArray] = useState(new Array(length).fill(''));
   const [indexFocus, setIndexFocus] = useState(null);
   const inputRef = useRef();

   const handleFocusInput = () => {
      inputRef.current.focus();
      setIndexFocus(0);
   };
   const handleChangeText = (event) => {
      if (event.length <= length) {
         const newBoxArray = [...boxArray];
         newBoxArray[event.length - 1] = event[event.length - 1];
         setBoxArray(newBoxArray);
         setInputValue(event);
         onChangeText(name)(event);
         setIndexFocus(event.length);
      }
      if (event.length <= boxArray.filter((item) => item !== '').length) {
         const newBoxArray = [...boxArray];
         newBoxArray[event.length] = '';
         setBoxArray(newBoxArray);
      }
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

      labelStyle: {
         paddingLeft: 1,
         paddingRight: 1,
         fontWeight: 'bold',
         color: theme === 'light' ? COLORS.gray45 : COLORS.gray30,
         marginBottom: 15,
      },
      boxWrap: {
         display: 'flex',
         flexDirection: 'row',
         gap: length > 4 ? '5%' : '15%',
         justifyContent: 'center',
      },
      boxOTPStyle: {
         padding: 20,
         paddingBottom: 15,
         paddingTop: 15,
         borderRadius: 5,
         borderWidth: 1.2,
         borderColor: COLORS.blue60,
      },
      boxIsFocus: {
         backgroundColor: COLORS.blue30,
      },
      textOTPStyle: {
         width: 8,
      },
      inputStyle: {
         display: 'none',
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
                  setIndexFocus(null);
               }}>
               <View style={styles.inputGroup}>
                  <View style={styles.boxWrap}>
                     {boxArray.map((item, index) => {
                        return (
                           <TouchableOpacity onPress={handleFocusInput} key={index}>
                              <View
                                 style={{
                                    ...styles.boxOTPStyle,
                                    ...boxOTPStyle,
                                    ...(index === indexFocus && styles.boxIsFocus),
                                 }}>
                                 <Text style={{ ...styles.textOTPStyle, ...textOTPStyle }}>
                                    {item !== '' ? item : ' '}
                                 </Text>
                              </View>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
                  <TextInput
                     ref={inputRef}
                     style={{ ...styles.inputStyle, ...inputStyle }}
                     name={name}
                     value={inputValue}
                     onChangeText={handleChangeText}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                     keyboardType={keyboardType}
                  />
               </View>
            </OutsidePressHandler>

            {touched && error && (
               <Text style={{ ...styles.textError, ...styleError }}>{error}</Text>
            )}
         </View>
      </View>
   );
}

export default InputOTP;
