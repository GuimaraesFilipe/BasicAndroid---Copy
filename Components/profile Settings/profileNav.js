import * as react from 'react';

import { KeyboardAvoidingView, useColorScheme,Pressable } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileSettings from './ProfileSettings';
import ProfileUpdate from './profileUpdate';
import Header from '../Header';
import OrderHistory from '../OrderHistory';
import {decode, encode} from 'base-64'
import paymentPage from '../paymentPage/paymentPage';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function ProfileNav() {
 

  const Stack = createNativeStackNavigator()


  
  const orientation = useDeviceOrientation()

  // colorScheme='dark'

  

  return (

   
   <Stack.Navigator initialRouteName="ProfileSettings"
      screenOptions={({ route }) => ({headerTitle:(props)=><Header {...props}></Header>,
      headerShown:  false            })}>
  <Stack.Screen name='ProfileSettings'  component={ProfileSettings} options={{title:"Profile Settings"} }></Stack.Screen>
  {/* <Stack.Screen name='ProfileUpdate'   component={ProfileUpdate} options={{title:"Sign up"} }></Stack.Screen> */}
  <Stack.Screen name='PaymentSettings'  component={paymentPage} options={{title:"Payment Settings"} }></Stack.Screen>
   </Stack.Navigator>
   



   

   

 

  );
}
