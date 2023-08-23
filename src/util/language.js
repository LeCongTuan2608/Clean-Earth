import AsyncStorage from '@react-native-async-storage/async-storage';

const setLanguage = async (language) => {
   try {
      await AsyncStorage.setItem('language', language);
   } catch (error) {
      console.log('Error while setting language:', error);
   }
};

const getLanguage = async () => {
   try {
      const result = await AsyncStorage.getItem('language');
      return result;
   } catch (error) {
      console.log('Error while getting language:', error);
   }
};
export { setLanguage, getLanguage };
