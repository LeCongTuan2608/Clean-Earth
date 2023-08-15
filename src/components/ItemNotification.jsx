import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AvatarCus from './AvatarCus';
import avatar from '../../assets/Images/avatar.jpg';
import { IconMaterial } from '../icons';
import { COLORS, SIZE } from '../constants';
import { ThemeContext } from '../context';
ItemNotification.propTypes = {};

function ItemNotification(props) {
   const { data } = props;
   const { theme } = useContext(ThemeContext);
   const styles = StyleSheet.create({
      item: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         gap: 5,
      },
      first: {
         padding: 10,
      },
      middle: {
         flex: 1,
         display: 'flex',
         alignItems: 'flex-start',
         gap: 3,
      },
      last: {
         paddingTop: 5,
         paddingBottom: 5,
         paddingLeft: 10,
         paddingRight: 10,
      },
      text: {
         color: theme === 'light' ? COLORS.black : COLORS.white,
      },
      textBold: {
         fontWeight: 'bold',
      },
      textFaint: {
         color: theme === 'light' ? COLORS.gray70 : COLORS.gray30,
      },
      h3: {
         fontSize: SIZE.medium,
      },
   });
   return (
      <View style={styles.item}>
         <View style={styles.first}>
            <AvatarCus size="medium" circular source={avatar} />
         </View>
         <View style={styles.middle}>
            <Text numberOfLines={3} ellipsizeMode="tail" style={{ ...styles.h3, ...styles.text }}>
               <Text style={{ ...styles.h3, ...styles.textBold, ...styles.text }}>
                  Le Cong Tuan
               </Text>{' '}
               da them 1 dia diem moi!
            </Text>
            <Text style={{ ...styles.text, ...styles.textFaint }}>4h truoc</Text>
         </View>
         <View style={styles.last}>
            <TouchableOpacity>
               <IconMaterial name="dots-horizontal" size={SIZE.xlarge} style={styles.text} />
            </TouchableOpacity>
         </View>
      </View>
   );
}

export default ItemNotification;
