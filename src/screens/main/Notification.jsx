import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HeaderNav, ItemNotification } from '../../components';
import { COLORS, SIZE } from '../../constants';
import { ThemeContext } from '../../context';
import { IconFeather, IconIon } from '../../icons';
import { useTranslation } from 'react-i18next';
Notification.propTypes = {};

function Notification(props) {
   const { t } = useTranslation();
   const { navigation } = props;
   const { theme } = useContext(ThemeContext);
   const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

   const onPressSetting = () => {
      navigation.navigate('Notification-Setting');
   };

   const styles = StyleSheet.create({
      header: {
         backgroundColor: theme === 'light' ? COLORS.blue60 : COLORS.darkBg,
         shadowColor: theme === 'light' ? COLORS.blue60 : COLORS.darkBg,
      },
      container: {
         flex: 1,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
      },
      // header title
      headerTitle: {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection: 'row',
         gap: 10,
         paddingTop: 5,
         paddingBottom: 5,
         paddingLeft: 15,
         paddingRight: 15,
      },
      title: {
         flex: 1,
      },
      titleIcon: {
         padding: 5,
         backgroundColor: theme === 'light' ? COLORS.gray20 : COLORS.gray70,
         borderRadius: '100%',
      },

      // content
      listItem: {
         marginTop: 10,
         flex: 1,
         display: 'flex',
         justifyContent: 'center',
         gap: 5,
         paddingBottom: '20%',
      },

      //
      icon: {
         fontSize: SIZE.large,
      },
      h1: {
         fontSize: SIZE.large,
         fontWeight: 'bold',
      },
      textTheme: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
   });
   return (
      <View style={styles.container}>
         <HeaderNav styled={styles.header} />
         <ScrollView>
            <View style={styles.headerTitle}>
               <View style={styles.title}>
                  <Text style={{ ...styles.h1, ...styles.textTheme }}>
                     {t('navigator.notification')}
                  </Text>
               </View>
               <TouchableOpacity onPress={onPressSetting}>
                  <View style={styles.titleIcon}>
                     <Text>
                        <IconIon name="settings" style={{ ...styles.icon, ...styles.textTheme }} />
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity>
                  <View style={styles.titleIcon}>
                     <Text>
                        <IconFeather
                           name="search"
                           style={{ ...styles.icon, ...styles.textTheme }}
                        />
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
            <View style={styles.listItem}>
               {arr.map((item, index) => (
                  <TouchableOpacity key={index}>
                     <ItemNotification data={item} />
                  </TouchableOpacity>
               ))}
            </View>
         </ScrollView>
      </View>
   );
}

export default Notification;
