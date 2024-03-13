import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,Alert
} from "react-native";
import styles from '../Style'
import defaultUser from '../../assets/User_Icon.png'
import { AntDesign, Feather } from "@expo/vector-icons";
import uplodImageFromDevice from "./uploadImageFromDevice";
import getBlobFromUri from "./getBlobFroUri";
import manageFileUpload from "./manageFileUpload";
import { useUser } from "../../provider/provider.js";


export default function ImageUploader(props) {
  const  userId = useUser();

  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);

  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");
  
  const profileImage={uri:props.profileImage.uri};
  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleLocalImageUpload = async () => {
    
    const fileURI = await uplodImageFromDevice();
    // console.log(fileURI)
    if (fileURI) {
      setImageURI(fileURI);
      // props.imageUplaoded();
      handleCloudImageUpload(fileURI);
    }

    // console.log(imgURI)
  };

  const onStart = () => {
    setIsUploading(true);
    props.imageUplaoded('in progress')
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    props.imageUplaoded('done')

    Alert.alert('Image Uploaded ✅', '', [
     
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };



  const handleCloudImageUpload = async (fileURI) => {
    if (!fileURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(fileURI);

    await manageFileUpload(blob,userId.uid,profileImage.uri, { onStart, onProgress, onComplete, onFail });
    
  };


    return (
        <View style={styles.welcome}>
     
        {Boolean(imgURI) ?  (
          
          <ImageBackground style={styles.userImage} source={{ uri: imgURI }} imageStyle={{ borderRadius: 80 }}>
         
         {!isUploading &&(<View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
           <View style={styles.editBackground}>
              <Feather name="edit-2" style={styles.editIcon}  onPress={handleLocalImageUpload}/>
          </View>
        
        </View>)}
      </ImageBackground>
        ):(  
        <ImageBackground
          source={profileImage? profileImage: {uri:'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0'}}
       
          imageStyle={{ borderRadius: 80 }} 
          style={styles.userImage} >
          <View style={styles.editBackground}>
              <Feather name="edit-2" style={styles.editIcon}  onPress={handleLocalImageUpload}/>
          </View>
          

      </ImageBackground>)}


        {isUploading && (
          <View style={styles.uploadProgressContainer}>
            <Text style={styles.feedbackTitle}> Upload {progress} of 100% </Text>
          </View>
        )}
  


      </View>
    )
}