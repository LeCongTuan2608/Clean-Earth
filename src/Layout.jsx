import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { COLORS } from './constants';
import { CheckedLoginContext } from './context';
import { ThemeContext } from './context/ThemeContext';
import { App, Auth } from './navigation';
import { LoadingApp } from './screens';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
Layout.propTypes = {};

function Layout(props) {
   const { theme, setTheme } = useContext(ThemeContext);
   const { login } = useContext(CheckedLoginContext);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 700);
   }, []);
   const styles = StyleSheet.create({
      container: {
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         flex: 1,
         color: theme === 'light' ? COLORS.black : COLORS.white,
         position: 'relative',
      },
      screen: {
         headerMode: 'float',
         cardStyle: {
            backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         },
         headerStyle: {
            backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
            shadowColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         },
         headerBackTitleStyle: {
            // color: theme === 'light' ? COLORS.black : COLORS.white, // style cho chữ của nut back
         },
         // headerTintColor: theme === 'light' ? COLORS.black : COLORS.white, // style cho nut back
         headerTitleStyle: {
            color: theme === 'light' ? COLORS.black : COLORS.white, // style cho title
         },
      },
   });

   return (
      <View style={styles.container}>
         {loading ? (
            <LoadingApp />
         ) : (
            <Stack.Navigator initialRouteName="Home" screenOptions={styles.screen}>
               {login
                  ? App.map((stack) => {
                       return (
                          <Stack.Screen
                             key={stack.name}
                             name={stack.name}
                             component={stack.element}
                             options={stack?.options}
                          />
                       );
                    })
                  : Auth.map((stack) => {
                       return (
                          <Stack.Screen
                             key={stack.name}
                             name={stack.name}
                             component={stack.element}
                             options={stack?.options}
                          />
                       );
                    })}
            </Stack.Navigator>
         )}

         <StatusBar style="auto" />
      </View>
   );
}

export default Layout;
