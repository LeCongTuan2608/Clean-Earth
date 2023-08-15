import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZE } from '../../constants';
import { ThemeContext } from '../../context';
import { AvatarCus } from '../../components';
import { fonts } from '@rneui/base';
import logo from '../../../assets/Images/logo.png';
LoadingApp.propTypes = {};

function LoadingApp(props) {
   const { theme } = useContext(ThemeContext);
   console.log('theme:', theme);

   const styles = StyleSheet.create({
      container: {
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         flex: 1,
         color: theme === 'light' ? COLORS.black : COLORS.white,
         position: 'relative',
      },
      logo: {
         flex: 1,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
      },
      nameWrap: {
         paddingTop: '10%',
         paddingBottom: '15%',
         display: 'flex',
         alignItems: 'center',
      },
      nameApp: {
         color: COLORS.blue50,
         fontWeight: '500',
         fontSize: SIZE.xmedium,
      },
   });
   return (
      <View style={styles.container}>
         <View style={styles.logo}>
            <AvatarCus size={'xlarge'} circular source={logo} />
         </View>
         <View style={styles.nameWrap}>
            <Text style={styles.nameApp}>Clear Garbage</Text>
         </View>
      </View>
   );
}

export default LoadingApp;
