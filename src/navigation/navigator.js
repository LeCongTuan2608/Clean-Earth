import {
   Login,
   Register,
   NotificationSetting,
   Profile,
   Theme,
   ForgotPassword,
   OTPVerification,
} from '../screens';
import MainTabs from './MainTabs';

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
         title: 'Setting',
         headerBackTitle: 'Notification',
      },
   },

   {
      name: 'Profile',
      element: Profile,
      options: {
         headerBackTitle: 'Menu',
      },
   },
   {
      name: 'Theme',
      element: Theme,
      options: {
         headerBackTitle: 'Menu',
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
   },
   {
      name: 'Forgot-Password',
      element: ForgotPassword,
      options: {
         title: 'Forgot Password',
      },
   },
   {
      name: 'OTP-Verification',
      element: OTPVerification,
      options: {
         title: 'OTP Verification',
      },
   },
];
export { App, Auth };
