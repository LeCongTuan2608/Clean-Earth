import {
   Login,
   Register,
   NotificationSetting,
   Profile,
   Theme,
   ForgotPassword,
   OTPVerification,
   Language,
} from '../screens';
import MainTabs from './MainTabs';

import { i18next, languageResources } from '../service';
const App = [
   /* home stack*/
   {
      name: 'Home',
      element: MainTabs,
      options: {
         headerShown: false,
      },
   },

   /* message stack*/

   /* search stack*/

   /* notification stack*/
   {
      name: 'Notification-Setting',
      element: NotificationSetting,
      options: {
         title: i18next.t('navigator.setting-notification'),
         headerBackTitle: 'Notification',
      },
   },

   {
      name: 'Profile',
      element: Profile,
      options: {
         headerBackTitle: 'Menu',
         title: i18next.t('navigator.profile'),
      },
   },
   {
      name: 'Theme',
      element: Theme,
      options: {
         headerBackTitle: 'Menu',
         title: i18next.t('navigator.theme'),
      },
   },
   {
      name: 'Language',
      element: Language,
      options: {
         headerBackTitle: 'Menu',
         title: i18next.t('navigator.language'),
      },
   },
];
const Auth = [
   {
      name: 'Login',
      element: Login,
      options: {
         headerShown: false,
      },
   },
   {
      name: 'Register',
      element: Register,
      options: {
         title: i18next.t('navigator.register'),
      },
   },
   {
      name: 'Forgot-Password',
      element: ForgotPassword,
      options: {
         title: i18next.t('navigator.forgot-password'),
      },
   },
   {
      name: 'OTP-Verification',
      element: OTPVerification,
      options: {
         title: i18next.t('navigator.OTP-verification'),
      },
   },
];
export { App, Auth };
