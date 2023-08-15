import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import Layout from './src/Layout';
import { CheckedLoginProvider, ThemeProvider } from './src/context';
import { EventProvider } from 'react-native-outside-press';

export default function App() {
   return (
      <CheckedLoginProvider>
         <ThemeProvider>
            <NavigationContainer>
               <EventProvider style={{ flex: 1 }}>
                  <Layout />
               </EventProvider>
            </NavigationContainer>
         </ThemeProvider>
      </CheckedLoginProvider>
   );
}
