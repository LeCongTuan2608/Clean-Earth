import axios from 'axios';
const API_KEY = 'bdc_14a76bce7fb945c18c46ee97beced6df';
const API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Geocoding = {
   getGeocoding(latitude, longitude) {
      const params = {
         params: {
            key: API_KEY,
            latitude,
            longitude,
            localityLanguage: 'vi',
         },
      };
      return axios.get(API_URL, params);
   },
};
export { Geocoding };
