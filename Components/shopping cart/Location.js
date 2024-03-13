import * as react from 'react';
import styles from '../Style.js';
import { useState,useEffect,useRef } from 'react';
import { doc, addDoc, setDoc, getDoc} from "firebase/firestore";
import { db } from '../../firebase/config.js';
import Config from "react-native-config";
import { useValidator } from '../../provider/FormValidator.js';
import {
  FlatList,
  TextInput,
  Pressable,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useUser } from "../../provider/provider.js";

import { Keyboard } from 'react-native'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useShopping } from '../../provider/shoppingProvider';
import Geocoder from 'react-native-geocoding';
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY);

export default function Locator (props) {
  const providedLoc= useShopping().deliveryLocation;
  const userLoc=useUser().location;
  const userAdress=useUser().address

 const [marker, setMarker] = useState(null); 
 const [placeholder,setPlaceHolder]=useState(null)
//console.log(marker)
 const ref = useRef();
 const [location, setLocation] = useState(providedLoc);
 


 useEffect(() => {
  ref.current?.setAddressText('');

  if(providedLoc){
  
    setLocation(providedLoc);
    setMarker(providedLoc)
    setPlaceHolder(providedLoc.address);

    } else{
      setLocation(userLoc);
      setMarker(userLoc);
      setPlaceHolder(userAdress);

    }
    
  
}, []);


  getMarkerLocation=(loc)=>{
    Geocoder.from(loc.latitude, loc.longitude)
    .then(json => {
            var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setPlaceHolder(addressComponent)
        setLocation({latitude:loc.latitude,longitude:loc.longitude})
        props.setLoc({latitude:loc.latitude,longitude:loc.longitude,address:addressComponent})

    })
    .catch(error => console.warn(error));
  }




  return (

<View style={{flex:1, borderRadius:8, borderWidth:2,borderColor:"transparent", marginBottom:"2%", padding:"1%"}} >
<MapView 
                zoomEnabled ={true}
                provider={ PROVIDER_GOOGLE }
                style={{flex: 1}} 
                region={{
                    latitude: location? location.latitude:54.721344, 
                    longitude:  location? location.longitude:-6.199981,
                    latitudeDelta:0.01,
                    longitudeDelta:0.01
                }} 
                
                showsUserLocation={true} >
                  <Marker draggable
                   pinColor = {"red"} 
    coordinate={marker}
    onDragEnd={(e) => {getMarkerLocation(e.nativeEvent.coordinate)}}
  />
  </MapView>
                 <View style={{ position: 'absolute', top: 10, width: '100%' }}>
                 <GooglePlacesAutocomplete
            
            numberOfLines={1}
                   placeholder={placeholder}
                   placeholderTextColor={'#666'}
                   
                   fetchDetails={true}
                   styles={{
                  
                     textInputContainer: {
                       borderWidth: 2,
                       alignSelf:"center",
                       borderColor:"#6b6e70",
                       backgroundColor: 'transparent',
                       borderRadius:8,
                       maxHeight:35,
                       color:'6b6e70',
                       numberOfLines:1
                     },
                     textInput: {
                       color: '#5d5d5d',
                       fontSize: 16,
                       maxHeight:30
                     },
                     predefinedPlacesDescription: {
                       color: '#1faadb',
                     },
                   }}
   ref={ref}
   onPress={(data, details = null) => {
    
    setLocation({latitude:JSON.stringify(details?.geometry?.location.lat),longitude:JSON.stringify(details?.geometry?.location.lng)})
    setMarker({latitude:JSON.stringify(details?.geometry?.location.lat),longitude:JSON.stringify(details?.geometry?.location.lng)})
    props.setLoc({latitude:JSON.stringify(details?.geometry?.location.lat),longitude:JSON.stringify(details?.geometry?.location.lng),address:JSON.stringify(details.formatted_address).replaceAll('"','')})
  }}
  onFail={(error) => console.error(error)}
   query={{
     key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
     language: 'en',
   }}
/>
  </View>
                </View>
            
  );

}

