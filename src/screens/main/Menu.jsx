import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import avatar from '../../../assets/Images/avatar.jpg';
import { AvatarCus, HeaderNav } from '../../components';
import { COLORS, SIZE } from '../../constants';
import { ThemeContext } from '../../context/ThemeContext';
import { IconAwesome, IconMat, IconMaterial } from '../../icons';
import { CheckedLoginContext } from '../../context';
import { useTranslation } from 'react-i18next';
Menu.propTypes = {};

function Menu(props) {
   const { navigation } = props;
   const { t } = useTranslation();
   const { theme, setTheme } = useContext(ThemeContext);
   const { login, setLogin } = useContext(CheckedLoginContext);

   const onPressProfile = () => {
      navigation.navigate('Profile');
   };
   const onPressStack = async (name = 'Profile') => {
      try {
         if (name === 'Login') {
            setLogin(false);
            await AsyncStorage.clear();
         } else {
            navigation.navigate(name);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };

   const styles = StyleSheet.create({
      container: {
         flex: 1,
      },
      header: {
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         shadowColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      content: {
         flex: 1,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      // user card
      userCard: {
         backgroundColor: theme === 'light' ? COLORS.gray20 : COLORS.gray90,
         borderRadius: 10,
         marginLeft: '5%',
         marginRight: '5%',
         marginTop: '10%',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         padding: 10,
         gap: 10,
      },
      userAvatar: {
         width: 60,
         height: 60,
         borderRadius: '100%',
      },
      userCardLeft: {},
      userCardMiddle: {
         flex: 1,
         display: 'flex',
         justifyContent: 'center',
         gap: 5,
      },
      userCardRight: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      },

      //list item
      listItem: {
         flex: 1,
         display: 'flex',
         marginTop: 60,
         gap: 5,
         paddingLeft: 10,
         paddingRight: 10,
      },
      item: {
         paddingTop: 10,
         paddingBottom: 10,
         paddingLeft: 15,
         paddingRight: 15,
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
      //
      heading: {
         fontSize: SIZE.large,
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
      icon: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
   });
   const listStack = [
      {
         label: t('menu.label-theme'),
         icon: <IconMaterial name="theme-light-dark" size={SIZE.large} style={styles.icon} />,
         name: 'Theme',
         stack: <IconMat name="arrow-forward-ios" size={SIZE.small} style={styles.icon} />,
      },
      {
         label: t('menu.label-language'),
         icon: <IconAwesome name="language" size={SIZE.large} style={styles.icon} />,
         name: 'Language',
         stack: <IconMat name="arrow-forward-ios" size={SIZE.small} style={styles.icon} />,
      },
      {
         label: t('menu.label-report'),
         icon: <IconMat name="report" size={SIZE.large} style={styles.icon} />,
         name: 'Report',
         stack: <IconMat name="arrow-forward-ios" size={SIZE.small} style={styles.icon} />,
      },
      {
         label: t('menu.label-support'),
         icon: <IconMat name="assignment-ind" size={SIZE.large} style={styles.icon} />,
         name: 'Support',
         stack: <IconMat name="arrow-forward-ios" size={SIZE.small} style={styles.icon} />,
      },
      {
         label: t('menu.label-logout'),
         icon: <IconMat name="logout" size={SIZE.large} style={styles.icon} />,
         name: 'Login',
      },
   ];
   return (
      <View style={styles.container}>
         <HeaderNav styled={styles.header} />
         <ScrollView style={styles.content}>
            <TouchableOpacity onPress={onPressProfile}>
               <View style={styles.userCard}>
                  <View style={styles.userCardLeft}>
                     <AvatarCus size="large" circular source={avatar} />
                  </View>
                  <View style={styles.userCardMiddle}>
                     <Text style={{ ...styles.heading, ...styles.text }}>Le Cong Tuan</Text>
                     <Text style={styles.text}>userId: 001</Text>
                  </View>
                  <View style={styles.userCardRight}>
                     <IconMat name="arrow-forward-ios" size={SIZE.medium} style={styles.icon} />
                  </View>
               </View>
            </TouchableOpacity>
            <View style={styles.listItem}>
               {listStack.map((item) => {
                  return (
                     <TouchableOpacity onPress={() => onPressStack(item.name)} key={item.name}>
                        <View style={styles.item}>
                           {item.icon}
                           <Text
                              style={{
                                 ...styles.textBoldMedium,
                                 ...styles.h2,
                                 ...styles.itemMiddle,
                                 ...styles.text,
                              }}>
                              {item.label}
                           </Text>
                           {item.stack && (
                              <Text style={{ ...styles.textBoldMedium, ...styles.h2 }}>
                                 {item.stack}
                              </Text>
                           )}
                        </View>
                     </TouchableOpacity>
                  );
               })}
            </View>
         </ScrollView>
      </View>
   );
}

export default Menu;
