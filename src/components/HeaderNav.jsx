import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

HeaderNav.propTypes = {};

function HeaderNav(props) {
   const { styled } = props;
   return <View style={{ ...styles.header, ...styled }}></View>;
}
const styles = StyleSheet.create({
   header: {
      backgroundColor: COLORS.blue60,
      padding: 30,
   },
});
export default HeaderNav;
