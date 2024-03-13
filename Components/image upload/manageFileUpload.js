
import { ref,uploadBytes,uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import updateUserImage from "./updateUserImage";
import { storage } from "../../firebase/config";
import {  deleteObject } from "firebase/storage";
import * as FileSystem from 'expo-file-system'


const manageFileUpload = async (
  file,userId, profileImage,
  { onStart, onProgress, onComplete, onFail }
) => {
  if(profileImage){
    profileImage=profileImage.split("%2F").pop();
    profileImage=profileImage.split("?alt=")[0];
  }
  
  const filesystemURI = `${userId}`
  const imageFolder='images/'
  const profileimageLoc=imageFolder.concat(profileImage)
// console.log(profileimageLoc)
  const previousImage = ref(storage,profileimageLoc);
  const imgName = "img-" + new Date().getTime();
// console.log(storage)
  const storageRef = ref(storage,`images/${imgName}.jpg`);

  // console.log("uploading file", imgName);

  // Create file metadata including the content type
  const metadata = {
    contentType: "image/jpeg",
  };

  // Trigger file upload start event
  onStart && onStart();
  const uploadTask = uploadBytesResumable(storageRef,file, metadata);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // Monitor uploading progress
      onProgress && onProgress(Math.fround(progress).toFixed(2));
    },
    (error) => {
      // Something went wrong - dispatch onFail event with error  response
      onFail && onFail(error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onComplete && onComplete(downloadURL);
         updateUserImage(userId,downloadURL);
        // console.log('File available at', downloadURL);
         FileSystem.downloadAsync(
              downloadURL,
              filesystemURI
            )
        deleteObject(previousImage).then(() => {
        // console.log('previous image deleted')
       
        }).catch((error) => {
          // console.log('not working', error)
        });
      }

      );
    }
  );
};

export default manageFileUpload;