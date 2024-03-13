import { createContext, useContext, useState ,useEffect,useRef,Alert} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth  } from '../firebase/config'
import { doc, getDoc, collection, query, where, getDocs, listCollections} from "firebase/firestore";
import { db } from '../firebase/config';
import Config from 'react-native-config'
import * as Location from 'expo-location';


export const UserContext = createContext(undefined);

 export const UserProvider = ({ children }) => {
    const[uid,setUid]=useState()
    const [user, setUser] = useState({})
    const ref = useRef();
 const [location, setLocation] = useState(null);
 const [address, setAddress] = useState(null);


 function getAddressFromCoordinates({ latitude, longitude }) {
console.log(latitude,longitude)

  return new Promise((resolve) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY}`
    
    fetch(url)
      .then(res => res.json())
      .then((resJson) => {
   
        // the response had a deeply nested structure :/
        if (resJson) {
        
          setAddress(resJson.results[0].formatted_address)

        } else {
          resolve()
        }
      })
      .catch((e) => {
       console.log('Error in getAddressFromCoordinates', e)
        resolve()
      })
  })
}

const getLoc =async () => {
      if(location && address ){
        const loc={latitude:location.latitude,longitude:location.longitude,address:address}

        return loc
      }else{
alert('error getting location')
}
}


    const fetchuser= async (uid) => {
       console.log('started')
       const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
  }

  function getCurrentLocation() {
    const timeout = 10000;
    return new Promise(async (resolve, reject) => {
      setTimeout(() => { reject(new Error(`Error getting gps location after ${(timeout * 2) / 1000} s`)) }, timeout * 2);
      setTimeout(async () => { resolve(await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000})) }, timeout);
      resolve(await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000}));
    });
  }
  
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUid (user.uid);
              // ...
              fetchuser(user.uid);
              console.log('fetching',user.uid)
             

            } else {
              // User is signed out
              // ...
              // console.log("user is logged out")
            }
          });
          (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
        
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            } 
            if (status == 'granted'){
              console.log('getting location')
           let  loc = await getCurrentLocation();
            
            if(loc==null){
              loc='{"coords": {"accuracy": 11.904864892135986, "altitude": 1554.0264225006104, "altitudeAccuracy": 10.09979248046875, "heading": -1, "latitude": -05.717775435288031, "longitude": -07.88491212130175, "speed": -1}, "timestamp": 1707996527899.446}'
            }
            console.log(loc)
            setLocation(loc.coords); 
            getAddressFromCoordinates(loc.coords)}
 
          })();

          
  

    }, [])  


   
      
    
  return (
    <UserContext.Provider
      value={ {uid,user,fetchuser,location,address,getLoc}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser=() => useContext(UserContext)



