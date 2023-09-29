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

import { i18next, languageResources } from '../service/i18n';
import { t } from 'i18next';

const App = [
   /* Home tab*/
   {
      name: 'App',
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
         title: 'navigator.setting-notification',
         headerBackTitle: 'navigator.notification',
      },
   },

   {
      name: 'Profile',
      element: Profile,
      options: {
         headerBackTitle: 'Menu',
         title: 'navigator.profile',
      },
   },
   {
      name: 'Theme',
      element: Theme,
      options: {
         headerBackTitle: 'Menu',
         title: 'navigator.theme',
      },
   },
   {
      name: 'Language',
      element: Language,
      options: {
         headerBackTitle: 'Menu',
         title: 'navigator.language',
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
         title: 'navigator.register',
         headerBackTitle: 'navigator.login',
      },
   },
   {
      name: 'Forgot-Password',
      element: ForgotPassword,
      options: {
         title: 'navigator.forgot-password',
         headerBackTitle: 'navigator.login',
      },
   },
   {
      name: 'OTP-Verification',
      element: OTPVerification,
      options: {
         title: 'navigator.OTP-verification',
         headerBackTitle: 'navigator.forgot-password',
      },
   },
];
export { App, Auth };
