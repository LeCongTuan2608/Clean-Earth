import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import loadingMap from '../../../assets/Images/animation_loading_map.gif';
import imgLocationCurrent from '../../../assets/Images/icon-location-current.png';
import { IconImage, InputCus, LoadingScreen } from '../../components';
import { COLORS, SIZE } from '../../constants';
import { ThemeContext } from '../../context/ThemeContext';
import { IconAwesome, IconIon } from '../../icons';
import location_image from '../../../assets/Images/location-image.png';
Home.propTypes = {};

const delta = {
   latitudeDelta: 0.0222,
   longitudeDelta: 0.002,
};
function Home(props) {
   const { theme, setTheme } = useContext(ThemeContext);
   const { t } = useTranslation();
   const [initialRegion, setInitialRegion] = useState({
      latitude: 0,
      longitude: 0,
      ...delta,
   });
   const [currentRegion, setCurrentRegion] = useState({ ...delta });
   const [hightColor, setHightColor] = useState(true);
   const [locationOther, setLocationOther] = useState([
      { id: 1, latitude: 10.85, longitude: 106.798 },
      { id: 2, latitude: 10.8505, longitude: 106.7975 },
      { id: 4, latitude: 10.851, longitude: 106.795 },
      { id: 5, latitude: 10.853, longitude: 106.799 },
      { id: 6, latitude: 10.852, longitude: 106.8 },
      { id: 7, latitude: 10.854, longitude: 106.802 },
      { id: 8, latitude: 10.855, longitude: 106.803 },
   ]);
   const [newRegion, setNewRegion] = useState({});
   const [search, setSearch] = useState('');
   const [onSearch, setOnSearch] = useState(true);
   const mapRef = useRef(null);
   useEffect(() => {
      const getLocation = async () => {
         try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
               console.error('Permission to access location was denied');
               return;
            }
            let result = await Location.getCurrentPositionAsync();
            console.log('result:', result);
            const { latitude, longitude } = result?.coords;
            // const info = await Geocoding.getGeocoding(region.latitude, region.longitude);
            // console.log('info:', info);

            setInitialRegion((pre) => {
               return { ...pre, latitude, longitude };
            });
            setCurrentRegion((pre) => {
               return { ...pre, latitude, longitude };
            });
         } catch (error) {
            console.log('error:', error);
         }
      };
      getLocation();
   }, []);
   // handle search
   const handleChangeText = (value) => {
      setSearch(value);
   };
   const onResetText = () => {
      setSearch('');
   };
   // handle map
   const handleChangeRegion = (region) => {
      setHightColor(true);
   };
   const handleBackRegion = () => {
      mapRef.current.animateToRegion(initialRegion, 500);
      setHightColor(false);
   };
   const handleMapPress = (event) => {
      const newLocation = {
         latitude: event.nativeEvent.coordinate.latitude,
         longitude: event.nativeEvent.coordinate.longitude,
      };
      setNewRegion(newLocation);
   };
   //style
   const styles = StyleSheet.create({
      container: {
         flex: 1,
      },

      searchBox: {
         position: 'absolute',
         zIndex: 1,
         marginTop: Platform.OS === 'ios' ? 50 : 20,
         width: '90%',
         alignSelf: 'center',
      },
      iconSeachBox: {
         position: 'absolute',
         zIndex: 2,
         top: '20%',
         left: 10,
      },
      inputSearch: {
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         borderBottomWidth: 0,
         paddingBottom: 12,
         paddingTop: 12,
         paddingLeft: 40,
         paddingRight: 40,
         shadowColor: theme === 'light' ? COLORS.darkBg : COLORS.lightBg,
         shadowOffset: {},
         shadowOpacity: 0.2,
         shadowRadius: 3,
         borderRadius: 7,
         fontSize: SIZE.xmedium,
      },
      content: {
         flex: 1,
         position: 'relative',
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
         position: 'relative',
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         // backgroundColor: 'red',
      },
      icon: {
         color: hightColor ? COLORS.blue60 : COLORS.gray25,
      },
   });
   return (
      <View style={styles.container}>
         {initialRegion?.latitude ? (
            <>
               <View style={styles.searchBox}>
                  <IconImage source={location_image} imageWrap={styles.iconSeachBox} />
                  <InputCus
                     inputStyle={styles.inputSearch}
                     value={search}
                     onChangeText={handleChangeText}
                     placeholder={t('home.placeholder-search')}
                     clearText
                     onResetText={onResetText}
                     icon={
                        <IconIon
                           name="search"
                           size={SIZE.xmedium}
                           style={{ color: theme === 'light' ? COLORS.black : COLORS.white }}
                        />
                     }
                  />
               </View>
               <MapView
                  ref={mapRef}
                  style={styles.content}
                  region={currentRegion}
                  provider={PROVIDER_GOOGLE}
                  onRegionChangeComplete={handleChangeRegion}
                  onPress={handleMapPress}>
                  {initialRegion?.latitude && (
                     <Marker
                        coordinate={{
                           latitude: initialRegion?.latitude,
                           longitude: initialRegion?.longitude,
                        }}
                        title="Your Location"
                        image={imgLocationCurrent}
                     />
                  )}
                  {locationOther.map((item) => {
                     return (
                        <Marker
                           key={item.id}
                           coordinate={{
                              latitude: item?.latitude,
                              longitude: item?.longitude,
                           }}
                           title={`Location ${item?.latitude}/${item?.longitude}`}
                        />
                     );
                  })}
                  {newRegion?.latitude && (
                     <Marker
                        coordinate={{
                           latitude: newRegion?.latitude,
                           longitude: newRegion?.longitude,
                        }}
                        title="New Location"
                        image={imgLocationCurrent}
                     />
                  )}
               </MapView>
               <TouchableOpacity style={styles.box} onPress={handleBackRegion}>
                  <View style={styles.item}>
                     <IconAwesome name="location-arrow" size={SIZE.large} style={styles.icon} />
                  </View>
               </TouchableOpacity>
            </>
         ) : (
            <LoadingScreen source={loadingMap} />
         )}
      </View>
   );
}

export default Home;
