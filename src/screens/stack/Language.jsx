import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { i18next, languageResources } from '../../service/i18next';
import { languageList } from '../../locales';
Language.propTypes = {};

function Language(props) {
   const { t } = useTranslation();

   return (
      <View>
         {Object.keys(languageResources).map((item) => {
            return <Text>{languageList[item].nativeName}</Text>;
         })}
      </View>
   );
}

export default Language;
