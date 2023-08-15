import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CheckedLoginContext = createContext({});
export const CheckedLoginProvider = ({ children }) => {
   const [login, setLogin] = useState(false);
   useEffect(() => {
      // getLogin();
   }, []);
   const getLogin = async () => {
      try {
         const token = await AsyncStorage.getItem('token');
         if (token !== null) {
            setLogin(true);
         } else {
            await AsyncStorage.setItem('token', 'true');
            setLogin(true);
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   return (
      <CheckedLoginContext.Provider value={{ login, setLogin }}>
         {children}
      </CheckedLoginContext.Provider>
   );
};
