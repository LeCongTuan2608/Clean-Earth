import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import Layout from './src/Layout';
import { CheckedLoginProvider, ThemeProvider } from './src/context';
import { EventProvider } from 'react-native-outside-press';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/service/i18n';
export default function App() {
   return (
      <I18nextProvider i18n={i18next}>
         <CheckedLoginProvider>
            <ThemeProvider>
               <NavigationContainer>
                  <EventProvider style={{ flex: 1 }}>
                     <Layout />
                  </EventProvider>
               </NavigationContainer>
            </ThemeProvider>
         </CheckedLoginProvider>
      </I18nextProvider>
   );
}
