import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

NotificationSetting.propTypes = {};

function NotificationSetting(props) {
   const { navigation } = props;

   return (
      <View>
         <Text>Setting</Text>
         <Button onPress={() => navigation.navigate('Notification')} title="Go to Notification" />
      </View>
   );
}

export default NotificationSetting;
