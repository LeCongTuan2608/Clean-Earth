import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { i18next, languageResources } from '../../service/i18n';
import { languageList } from '../../locales';
import { ThemeContext } from '../../context';
import { COLORS, SIZE } from '../../constants';
import { CheckBox } from '@rneui/themed';
import { getLanguage, setLanguage } from '../../util';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IconAwesome, IconFeather } from '../../icons';
Language.propTypes = {};

function Language(props) {
   const { theme } = useContext(ThemeContext);
   const { t } = useTranslation();
   const [selectedLng, setSelectedLng] = useState(null);
   useEffect(() => {
      const fetchLanguage = async () => {
         const language = await getLanguage();
         setSelectedLng(language || 'en');
      };
      fetchLanguage();
   }, []);
   const handleChangeLng = async (lng) => {
      if (selectedLng !== lng) {
         await i18next.changeLanguage(lng);
         setSelectedLng(lng);
         await setLanguage(lng);
      }
   };
   const styles = StyleSheet.create({
      container: {
         flex: 1,
      },
      content: {
         padding: 10,
         gap: 5,
      },
      item: {
         paddingTop: 15,
         paddingBottom: 15,
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
   return (
      <ScrollView style={styles.container}>
         <View style={styles.content}>
            {Object.keys(languageResources).map((item) => {
               return (
                  <TouchableOpacity onPress={() => handleChangeLng(item)} key={item}>
                     <View style={styles.item}>
                        <Text
                           style={{
                              ...styles.textBoldMedium,
                              ...styles.h2,
                              ...styles.itemMiddle,
                              ...styles.text,
                           }}>
                           {languageList[item].nativeName}
                        </Text>
                        {selectedLng === item && (
                           <IconAwesome name="check" size={SIZE.medium} style={styles.text} />
                        )}
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </ScrollView>
   );
}

export default Language;
