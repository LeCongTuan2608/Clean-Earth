import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context';
import { COLORS, SIZE } from '../../constants';
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

Theme.propTypes = {};

function Theme(props) {
   const { theme, setTheme } = useContext(ThemeContext);
   const { t } = useTranslation();
   const [selectedMode, setMode] = useState(theme);

   const onPressMode = async (mode = 'light') => {
      try {
         if (mode === theme) return;
         setTheme(mode);
         setMode(mode);
         await AsyncStorage.setItem('theme', mode);
      } catch (error) {
         console.log('error:', error);
      }
   };
   const styles = StyleSheet.create({
      container: {
         flex: 1,
         paddingLeft: 10,
         paddingRight: 10,
         display: 'flex',
         gap: 5,
      },
      item: {
         paddingTop: 10,
         paddingBottom: 10,
         paddingLeft: 20,
         paddingRight: 20,
         borderRadius: 5,
         backgroundColor: theme === 'light' ? COLORS.gray10 : COLORS.gray90,
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         gap: 5,
      },
      itemMiddle: {
         flex: 1,
         justifyContent: 'flex-start',
      },
      h1: {
         fontSize: SIZE.large,
      },
      h2: {
         fontSize: SIZE.medium,
      },
      h3: {
         fontSize: SIZE.small,
      },
      text: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
      textBoldMedium: {
         fontWeight: '600',
      },
      checkBox: {
         backgroundColor: theme === 'light' ? COLORS.gray10 : COLORS.gray90,
      },
   });
   const mode = [
      {
         label: t('theme.light-mode'),
         name: 'light',
      },
      {
         label: t('theme.dark-mode'),
         name: 'dark',
      },
   ];
   return (
      <View style={styles.container}>
         {mode.map((item) => {
            return (
               <TouchableOpacity onPress={() => onPressMode(item.name)} key={item.name}>
                  <View style={styles.item}>
                     <Text
                        style={{
                           ...styles.textBoldMedium,
                           ...styles.h2,
                           ...styles.itemMiddle,
                           ...styles.text,
                        }}>
                        {item.label}
                     </Text>

                     <CheckBox
                        containerStyle={styles.checkBox}
                        checked={selectedMode === item.name}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor={COLORS.blue60}
                        onPress={() => onPressMode(item.name)}
                     />
                  </View>
               </TouchableOpacity>
            );
         })}
      </View>
   );
}

export default Theme;
