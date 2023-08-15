import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = createContext({});
export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState('light');
   useEffect(() => {
      getTheme();
   }, []);
   const getTheme = async () => {
      try {
         const savedTheme = await AsyncStorage.getItem('theme');
         if (savedTheme !== null) {
            setTheme(savedTheme);
         } else {
            await AsyncStorage.setItem('theme', 'light');
         }
      } catch (error) {
         console.log('error:', error);
      }
   };
   return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
