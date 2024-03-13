import * as react from 'react';
import { View, Text, ScrollView, Pressable, Image, Modal, Alert, TextInput } from 'react-native'
import styles from '../Style.js'

import { auth } from '../../firebase/config.js'
import {  sendPasswordResetEmail } from "firebase/auth";



export default function PasswordRecovey(props) {
  const [modalVisible, setModalVisible] = react.useState(props.showItem);
  const [email, onChangeEmail] = react.useState(props.email)
const resetPass=()=>{
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Password recovery email sent.');
    setModalVisible(false)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

  return (
    < Modal
      animationType="fade"
      presentationStyle='formSheet'
      transparent={true}
      visible={modalVisible}
      
    >

      
<View style={styles.centeredView} onTouchEnd={() => setModalVisible(false)} >
          <View style={styles.modalView}>
          <Text style={styles.welcomeLogin} >Password Recovery</Text>

          <TextInput style={styles.logininput} placeholder='Email ' placeholderTextColor="#6b6e70"  value={email} onChangeText={onChangeEmail} keyboardType={'email-address'} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
          
        <Pressable                 style={styles.loginButton} 
 onPress={() => resetPass()}>
          <Text style={styles.buttonText} >Recover </Text>
        
        </Pressable>
      </View>
      </View>
    </Modal>


  )
}