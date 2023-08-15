import React, { useContext } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HeaderNav } from '../../components';
import { COLORS } from '../../constants';
import { ThemeContext } from '../../context/ThemeContext';
Home.propTypes = {};

function Home(props) {
   const { theme, setTheme } = useContext(ThemeContext);

   const changeTheme = () => {
      setTheme((pre) => (pre === 'light' ? 'dark' : 'light'));
   };
   const styles = StyleSheet.create({
      container: {
         flex: 1,
      },
      content: {
         flex: 1,
         backgroundColor: theme === 'light' ? COLORS.lightBg : COLORS.darkBg,
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
      button: {
         alignItems: 'center',
         backgroundColor: '#DDDDDD',
         padding: 10,
      },
   });
   return (
      <View style={styles.container}>
         <HeaderNav />
         <ScrollView style={styles.content}>
            <View>
               <Text>Home Screen!</Text>
               <TouchableOpacity style={styles.button}>
                  <Button title="Right button" onPress={changeTheme} />
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
}

export default Home;
