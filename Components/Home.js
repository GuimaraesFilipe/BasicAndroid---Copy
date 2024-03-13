import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator}from '@react-navigation/bottom-tabs';
import OrderHistory from './OrderHistory.js';
import WelcomeScreen from './welcomeScreen';
import HeaderTab from './HeaderTab';
import styles from './Style'
import MenuItems from './MenuItems';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { auth  } from '../firebase/config'
import { collection, getDocs } from "firebase/firestore";
import ProfileNav from './profile Settings/profileNav';
import {db} from '../firebase/config';
import { useUser } from "../provider/provider.js";
import MenuItemsSection from './Menu-SectionList';
import ShoppingCart from './shopping cart/ShoppingCart';
import { ShoppingProvider } from '../provider/shoppingProvider';
import { useEffect,useState } from 'react';
import {
  ActivityIndicator, View
 
} from "react-native";
export default function Home() {
  const  providedUser = useUser().user;
  const fetch=useUser().fetchuser
  const Tab = createBottomTabNavigator();
    const[recipes,setRecipes]=useState([])
    const[user,setUser]=useState()

  console.log(providedUser)

    const fetchPost = async () => {
       
      await getDocs(collection(db, "recipes"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setRecipes(newData);                
              // console.log(recipes);
          })
     
  }

  useEffect(()=>{
    setUser(providedUser)
   
}, [])
  useEffect(()=>{
      fetchPost();
     
  }, [user])



  // colorScheme='dark'



  return (
//Tab navigator
<>
{!user?(    <View style={{ flex: 1, justifyContent: "center" }}>
  <ActivityIndicator size="large" color="#f4ce14" />
  </View>
): (<ShoppingProvider>
      <Tab.Navigator initialRouteName="Welcome" 
        screenOptions={({ route }) => ({ 
          tabBarIcon: ({ focused, color, size }) => {    
            let iconName;
  
            if (route.name === 'login') {
              iconName = focused
                ? 'login'
                : 'login';
            } else if (route.name === 'Welcome') {
              iconName ="infocirlce";
              return <AntDesign name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'Orders') {
              return <FontAwesome name="history" size={size} color={color}/>
            }
            else if (route.name === 'menuflat') {
              iconName ="menufold";
              return <AntDesign name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'profile') {
              iconName ="user";
              return <AntDesign name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'shoppingCart') {
              iconName ="shoppingcart";
              return <AntDesign name={iconName} size={size} color={color} />;
            }
           
          },
          tabBarActiveTintColor: '#F4CE14',
          tabBarInactiveTintColor: 'gray',
          headerTitle:(props)=><HeaderTab {...props}></HeaderTab>,
          headerShown:  false    
        })}

 >
        <Tab.Screen name='Welcome'
          style={styles.container}
          component={WelcomeScreen}
         
          >
          </Tab.Screen>
          
        <Tab.Screen name='shoppingCart' component={ShoppingCart} ></Tab.Screen>
        <Tab.Screen name='Orders' component={OrderHistory}></Tab.Screen>


        <Tab.Screen name='profile' component={ProfileNav} />

      </Tab.Navigator>
      
      </ShoppingProvider>)}
</>

   

   

 

  );
}
