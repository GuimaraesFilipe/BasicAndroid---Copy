import * as React from 'react';

import { doc,setDoc  } from "firebase/firestore";
import {db} from '../../firebase/config';

const updateUserImage =  async ( userId,imageURL) => {

    // console.log(userId)
       
    try {
          setDoc(doc(db, "users",userId), {profileImage:imageURL},{merge:true});
        // console.log("image added to user");
      } catch (e) {
        // console.error("Error adding document: ", e);
      }
}

export default updateUserImage