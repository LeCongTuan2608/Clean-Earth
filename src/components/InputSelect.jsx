import React, { useContext, useState, useEffect } from 'react';
import {
   StyleSheet,
   Text,
   TextInput,
   TouchableNativeFeedback,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import { COLORS } from '../constants';
import { ThemeContext } from '../context';
import { IconMat } from '../icons';
import OutsidePressHandler from 'react-native-outside-press';

InputSelect.propTypes = {};

function InputSelect(props) {
   const { theme } = useContext(ThemeContext);
   const {
      //    text
      label = false,
      //style
      labelStyle = {},
      inputStyle = {},
      styleComboBox = {},
      styleItem = {},
      //icon
      icon = undefined,
      //   property
      name = undefined,
      onBlur = undefined,
      onChangeText = undefined,
      value = '',
      defaultValue = '',
      placeholder = undefined,
      onFocus = undefined,
      onChange = undefined,
      setFieldValue = undefined,

      //   errors
      styleError = {},
      error = undefined,
      touched = undefined,
      //items
      items = [],
   } = props;
   const [show, setShow] = useState(false);
   const [valueInput, setValueInput] = useState(
      typeof defaultValue === 'number' && defaultValue >= 0 && defaultValue <= items.length
         ? items[defaultValue].value
         : value,
   );
   useEffect(() => {
      setFieldValue(name, valueInput);
   }, []);
   const showBoxSelect = () => {
      setShow(!show);
   };
   const onSelect = (value) => {
      setValueInput(value);
      setFieldValue(name, value);
      setShow(false);
   };
   const handlePressOut = () => {
      setShow(false);
   };

   const styles = StyleSheet.create({
      container: {
         position: 'relative',
         zIndex: 2,
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
         marginBottom: 5,
         zIndex: 1,
      },
      inputStyle: {
         padding: 10,
         paddingLeft: 10,
         paddingRight: 1,
         borderWidth: 1,
         borderColor: COLORS.gray45,
         borderRadius: 6,
         fontWeight: '500',
         color: theme === 'light' ? COLORS.gray90 : COLORS.gray00,
         zIndex: 1,
      },
      textError: {
         color: theme === 'light' ? COLORS.red500 : COLORS.red500,
         paddingTop: 10,
      },
      styleComboBox: {
         zIndex: 10,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.gray80,
         position: 'absolute',
         left: 0,
         right: 0,
         top: '100%',
         paddingTop: 10,
         paddingBottom: 10,
         paddingLeft: 20,
         paddingRight: 20,
         borderRadius: 7,
         shadowColor: theme === 'light' ? COLORS.darkBg : COLORS.lightBg,
         shadowOffset: {},
         shadowOpacity: 0.2,
         shadowRadius: 3,
         display: 'flex',
         flexDirection: 'column',
         gap: 7,
         //  backgroundColor: COLORS.gray10,
      },
      styleItem: {
         paddingTop: 10,
         paddingBottom: 10,
         backgroundColor: theme === 'light' ? COLORS.gray10 : COLORS.gray70,
         paddingLeft: 5,
         borderRadius: 7,
      },
   });
   return (
      <View style={styles.container}>
         <View>
            {label && <Text style={{ ...styles.labelStyle, ...labelStyle }}>{label}</Text>}
            <TouchableOpacity onPress={showBoxSelect} activeOpacity={0.4}>
               <View style={styles.inputGroup} pointerEvents="none">
                  <TextInput
                     style={{ ...styles.inputStyle, ...inputStyle }}
                     name={name}
                     value={valueInput}
                     defaultValue={defaultValue}
                     onBlur={onBlur}
                     placeholder={placeholder ? placeholder : 'Select value...'}
                     onFocus={onFocus}
                     onChange={onChange}
                     editable={false}
                  />
                  {icon === undefined ? (
                     <View style={styles.icon} onPress={showBoxSelect}>
                        <IconMat
                           name="keyboard-arrow-down"
                           size={20}
                           style={{ color: theme === 'light' ? COLORS.black : COLORS.white }}
                        />
                     </View>
                  ) : (
                     <View style={styles.icon} onPress={showBoxSelect}>
                        {icon}
                     </View>
                  )}
               </View>
            </TouchableOpacity>
            {touched && error && (
               <Text style={{ ...styles.textError, ...styleError }}>{error}</Text>
            )}
         </View>
         {items?.length !== 0 && show && (
            <OutsidePressHandler onOutsidePress={handlePressOut}>
               <View style={{ ...styles.styleComboBox, ...styleComboBox }}>
                  {items.map((item) => {
                     return (
                        <TouchableOpacity
                           key={item.value}
                           style={{ ...styles.styleItem, ...styleItem }}
                           activeOpacity={0.4}
                           onPress={() => onSelect(item.value)}>
                           <View>
                              <Text
                                 style={{ color: theme === 'light' ? COLORS.black : COLORS.white }}>
                                 {item.label}
                              </Text>
                           </View>
                        </TouchableOpacity>
                     );
                  })}
               </View>
            </OutsidePressHandler>
         )}
      </View>
   );
}

export default InputSelect;
