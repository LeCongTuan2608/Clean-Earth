import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';

IconImage.propTypes = {};

function IconImage(props) {
   const { source = undefined, styleImage = {}, imageWrap = {}, width = 25, height = 30 } = props;

   const styles = StyleSheet.create({
      imageWrap: {},
      image: {
         width: width,
         height: height,
      },
   });
   return (
      <View style={{ ...styles.imageWrap, ...imageWrap }}>
         <Image style={{ ...styles.image, ...styleImage }} source={source} />
      </View>
   );
}

export default IconImage;
