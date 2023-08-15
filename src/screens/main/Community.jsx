import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { HeaderNav } from '../../components';

Community.propTypes = {};

function Community(props) {
   return (
      <View>
         <HeaderNav />
         <Text>Community! 💬💬</Text>
      </View>
   );
}

export default Community;
