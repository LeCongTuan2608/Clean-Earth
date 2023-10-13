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
import { Geocoding } from '../../service/api';
import MapViewDirections from 'react-native-maps-directions';

Home.propTypes = {};
const getGeocoding = async (latitude, longitude) => {
   const result = await Geocoding.getGeocoding(latitude, longitude);
   return result;
};
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
   const [destination, setDestination] = useState({});
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
            // getGeocoding(latitude, longitude);
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
   const handleSubmit = (event) => {
      console.log('search:', search);
   };

   // handle map
   const handleChangeRegion = (region) => {
      setHightColor(true);
   };
   const handleBackRegion = () => {
      mapRef.current.animateToRegion(initialRegion, 500);
      setHightColor(false);
   };
   const handleMapPress = async (event) => {
      const newDestination = {
         latitude: event.nativeEvent.coordinate.latitude,
         longitude: event.nativeEvent.coordinate.longitude,
      };
      setDestination(newDestination);
      // await getGeocoding(newDestination.latitude, newDestination.longitude);
   };
   const handlePoiClick = async (event) => {
      // event.persist();
      const { coordinate, name, placeId } = event.nativeEvent;
      // console.log(`Đã nhấn vào điểm: ${name} tại vị trí: ${JSON.stringify(coordinate)}`);
      // const result = await getGeocoding(coordinate.latitude, coordinate.longitude);
      setDestination(coordinate);
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
                     onSubmitEditing={handleSubmit}
                     placeholder={t('home.placeholder-search')}
                     resetText
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
                  onPoiClick={handlePoiClick}
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
                  {destination?.latitude && (
                     <Marker
                        coordinate={{
                           latitude: destination?.latitude,
                           longitude: destination?.longitude,
                        }}
                        title="New Location"
                        image={imgLocationCurrent}
                        draggable
                     />
                  )}
                  {/* <MapViewDirections
                     origin={initialRegion}
                     destination={destination}
                     apikey={'AIzaSyBBjBlMOC4HHcu9bo6xtvt_3AbxJhRutl8'}
                  /> */}
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
