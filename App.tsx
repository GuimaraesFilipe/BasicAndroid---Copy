/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { KeyboardAvoidingView, useColorScheme,Pressable } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './provider/provider';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useUser } from "./provider/provider.js";
import Home from './Components/Home';
import RegisterPage from './Components/Registration';
import LoginPage from './Components/LoginPage';
import { useMenu } from "./provider/menuProvider.js";
import { useEffect } from 'react';
import styles from './Components/Style'
import { registerRootComponent } from 'expo';
import { useState } from 'react';
import {decode, encode} from 'base-64'
import { MenuProvider } from './provider/menuProvider';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { LogBox } from 'react-native';
import { ValidatorProvider } from './provider/FormValidator.js';
LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import Config from "react-native-config";



function App(): React.JSX.Element  {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const  userId = useUser();

  const Stack = createNativeStackNavigator()


  const colorScheme = useColorScheme();
  const orientation = useDeviceOrientation()





  return (
<UserProvider>
  <MenuProvider>
  <ValidatorProvider> 
     {/* {!loaded  && (
        <View style={{ backgroundColor: 'red', flex: 1 }}>

        </View>
      )} */}

<NavigationContainer >

   <Stack.Navigator initialRouteName={userId?"Home":"login" }
      screenOptions={({ route }) => ({headerTitle:(props)=><Header {...props}></Header>,
      headerShown:  false            })}>
  <Stack.Screen name='login' component={LoginPage} options={{title:"Login"} }></Stack.Screen>

  <Stack.Screen name='Registration' component={RegisterPage} options={{title:"Sign up"} }></Stack.Screen>

     <Stack.Screen name='Home'
       style={styles.container}
       component={Home} >
       </Stack.Screen>
   </Stack.Navigator>
   
 </NavigationContainer>
 </ValidatorProvider>
 </MenuProvider>
</UserProvider>
//Stack Navigator
   

   

 

  );
}

registerRootComponent(App);
export default App;
