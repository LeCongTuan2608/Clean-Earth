import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Animated, Easing, Image } from 'react-native';
import loadingDefault from '../../assets/Images/animation_loading_default.gif';
LoadingScreen.propTypes = {};

function LoadingScreen(props) {
   const { source = loadingDefault } = props;

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'white',
      },
      content: {
         marginBottom: 50,
      },
   });
   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <Image source={source} />
         </View>
      </View>
   );
}

export default LoadingScreen;
