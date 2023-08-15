import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';
import { ThemeContext } from '../context/ThemeContext';
import { IconAnt, IconFeather, IconIon, IconMat } from '../icons';
import { Community, Home, Menu, Notification, Rank } from '../screens';

const Tab = createBottomTabNavigator();
MainTabs.propTypes = {};

function MainTabs(props) {
   const { theme, setTheme } = useContext(ThemeContext);

   const styles = StyleSheet.create({
      tabNavigation: {
         tabBarBadgeStyle: {
            padding: 30,
         },
         tabBarStyle: {
            position: 'absolute',
            backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         },
         tabBarItemStyle: {},
         tabBarActiveTintColor: COLORS.blue60,
         tabBarInactiveTintColor: COLORS.gray45,
         tabBarLabelStyle: {},
         headerShown: false,
      },
      itemNav: {
         fontWeight: '500',
      },
      sizeIcon: 25,
   });
   return (
      <Tab.Navigator screenOptions={{ ...styles.tabNavigation }} initialRouteName="Home" id="main">
         <Tab.Screen
            name="Home"
            component={Home}
            options={{
               tabBarLabel: (props) => (
                  <Text style={{ color: props.color, ...styles.itemNav }}>Home</Text>
               ),
               tabBarIcon: (props) => (
                  <Text style={{ color: props.color }}>
                     <IconAnt name="home" size={styles.sizeIcon} />
                  </Text>
               ),
            }}
         />
         <Tab.Screen
            style={styles.itemNav}
            name="Community"
            component={Community}
            options={{
               tabBarLabel: (props) => (
                  <Text style={{ color: props.color, ...styles.itemNav }}>Community</Text>
               ),
               tabBarIcon: (props) => (
                  <Text style={{ color: props.color }}>
                     <IconIon name="earth" size={styles.sizeIcon} />
                  </Text>
               ),
            }}
         />
         <Tab.Screen
            style={styles.itemNav}
            name="Rank"
            component={Rank}
            options={{
               tabBarLabel: (props) => (
                  <Text style={{ color: props.color, ...styles.itemNav }}>Rank</Text>
               ),
               tabBarIcon: (props) => (
                  <Text style={{ color: props.color }}>
                     <IconIon name="trophy-outline" size={styles.sizeIcon} />
                  </Text>
               ),
            }}
         />
         <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
               tabBarLabel: (props) => (
                  <Text style={{ color: props.color, ...styles.itemNav }}>Notification</Text>
               ),
               tabBarIcon: (props) => (
                  <Text style={{ color: props.color }}>
                     <IconIon name="notifications-outline" size={styles.sizeIcon} />
                  </Text>
               ),
            }}
         />
         <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
               tabBarLabel: (props) => (
                  <Text style={{ color: props.color, ...styles.itemNav }}>Menu</Text>
               ),
               tabBarIcon: (props) => (
                  <Text style={{ color: props.color }}>
                     <IconIon name="menu" size={styles.sizeIcon} />
                  </Text>
               ),
            }}
         />
      </Tab.Navigator>
   );
}
export default MainTabs;
