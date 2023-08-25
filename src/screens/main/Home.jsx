import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HeaderNav, LoadingScreen } from '../../components';
import { COLORS, SIZE } from '../../constants';
import { ThemeContext } from '../../context/ThemeContext';
import MapView, { Marker } from 'react-native-maps';
import loadingMap from '../../../assets/Images/animation_loading_map.gif';
import * as Location from 'expo-location';
import { IconAwesome } from '../../icons';
import imgLocation from '../../../assets/Images/animation_icon_location.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
Home.propTypes = {};

function Home(props) {
   const { theme, setTheme } = useContext(ThemeContext);
   const [initialRegion, setInitialRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.002,
   });
   const [currentRegion, setCurrentRegion] = useState(initialRegion);
   const [hightColor, setHightColor] = useState(true);
   const mapRef = useRef(null);
   useEffect(() => {
      const getLocation = async () => {
         try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
               console.error('Permission to access location was denied');
               return;
            }
            let result = await Location.getCurrentPositionAsync({});
            const region = {
               ...initialRegion,
               latitude: result?.coords?.latitude,
               longitude: result?.coords?.longitude,
            };
            setInitialRegion(region);
            setCurrentRegion(region);
         } catch (error) {
            console.log('error:', error);
         }
      };
      getLocation();
   }, []);
   const handleChangeRegion = (region) => {
      if (
         region.latitude !== initialRegion.latitude &&
         region.longitude !== initialRegion.longitude
      ) {
         setHightColor(false);
      }
      setCurrentRegion(region);
   };
   const handleBackRegion = () => {
      mapRef.current.animateToRegion(initialRegion, 500);
      setHightColor(true);
   };
   const styles = StyleSheet.create({
      container: {
         flex: 1,
      },
      content: {
         flex: 1,
         position: 'relative',
         // backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         // color: theme === 'light' ? COLORS.black : COLORS.white,
      },
      button: {
         alignItems: 'center',
         backgroundColor: '#DDDDDD',
         padding: 10,
      },
      box: {
         position: 'absolute',
         bottom: '12%',
         right: '3%',
         borderRadius: 100,
         width: 55,
         height: 55,
         backgroundColor: COLORS.lightBg,
      },
      item: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      icon: {
         color: hightColor ? COLORS.blue60 : COLORS.gray25,
      },
   });
   return (
      <View style={styles.container}>
         <HeaderNav />
         {initialRegion.latitude ? (
            <MapView
               ref={mapRef}
               style={styles.content}
               initialRegion={initialRegion}
               region={currentRegion}
               onRegionChangeComplete={handleChangeRegion}>
               <Marker
                  coordinate={{
                     latitude: initialRegion?.latitude,
                     longitude: initialRegion?.longitude,
                  }}
                  title="Your Location"
               />
               <TouchableOpacity style={styles.box} onPress={handleBackRegion}>
                  <View style={styles.item}>
                     <IconAwesome name="location-arrow" size={SIZE.large} style={styles.icon} />
                  </View>
               </TouchableOpacity>
            </MapView>
         ) : (
            <LoadingScreen source={loadingMap} />
         )}
      </View>
   );
}

export default Home;
