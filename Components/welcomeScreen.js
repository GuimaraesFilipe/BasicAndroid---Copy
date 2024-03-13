import * as react from 'react';
import styles from './Style'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuItemsSection from './Menu-SectionList';
import WelcomePage from './WelcomePage';

export default function WelcomeScreen ({navigation}){
  
  const Stack = createNativeStackNavigator()

  return(
   
   <Stack.Navigator initialRouteName= 'WelcomePage'
      screenOptions={({ route }) => ({
      headerShown:  false            })}> 
  <Stack.Screen name='WelcomePage' component={WelcomePage} options={{title:"Welcome"} }></Stack.Screen>
  <Stack.Screen name='MenuCat' component={MenuItemsSection} options={{title:"Menu Category"} }></Stack.Screen>
  
   </Stack.Navigator>

   
    
        
 
)
}