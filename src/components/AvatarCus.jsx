import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';

AvatarCus.propTypes = {};

function AvatarCus(props) {
   const { size = 40, source, circular = false, styleContainer = {}, styleImage = {} } = props;
   let sizeDefault = size;
   if (size && typeof size === 'number') {
      sizeDefault = size;
   } else if (size === 'small') {
      sizeDefault = 40;
   } else if (size === 'medium') {
      sizeDefault = 60;
   } else if (size === 'large') {
      sizeDefault = 80;
   } else if (size === 'xlarge') {
      sizeDefault = 100;
   }
   const styles = StyleSheet.create({
      container: {},
      avatar: {
         width: sizeDefault,
         height: sizeDefault,
         borderRadius: circular ? 100 : 5,
         objectFit: 'cover',
      },
   });
   return (
      <View style={{ ...styles.container, ...styleContainer }}>
         <Image style={{ ...styles.avatar, ...styleImage }} source={source} />
      </View>
   );
}

export default AvatarCus;
