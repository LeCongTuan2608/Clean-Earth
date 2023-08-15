import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';
import { ThemeContext } from '../../context';
import { HeaderNav } from '../../components';

Rank.propTypes = {};

function Rank(props) {
   const { theme } = useContext(ThemeContext);
   const styles = StyleSheet.create({
      header: {
         backgroundColor: theme === 'light' ? COLORS.blue60 : COLORS.darkBg,
         shadowColor: theme === 'light' ? COLORS.blue60 : COLORS.darkBg,
      },
   });
   return (
      <View>
         <HeaderNav styled={styles.header} />
         <Text>Rank !</Text>
      </View>
   );
}

export default Rank;
