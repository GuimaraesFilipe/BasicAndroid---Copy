import { useState,useEffect } from 'react';
import { View, Pressable, Text, ScrollView, TextInput, KeyboardAvoidingView, Alert, ImageBackground,TouchableOpacity } from 'react-native'
import styles from './Style'
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config'
import logo from '../assets/littleLogo.png'
import { doc, addDoc,setDoc  } from "firebase/firestore";
import {db} from '../firebase/config';
import { Ionicons } from '@expo/vector-icons';
import { useValidator } from '../provider/FormValidator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function RegisterPage({ navigation,props }) {
    const validator=useValidator()
    const [fullName, setFullName] = useState('')
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, onChangePhone] = useState('')
    const [invalidpassword, onChangeValidpassword] = useState(false)
    const [formFieldFOcus, onChangeformFieldFOcus] = useState(false)
    const [hideBackGound, onhideBackGound] = useState(false)
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 
    const form={
        type:'Register',
        name:fullName,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
        phone:phone
    }
    useEffect(() => { 
    const validation=validator.validateForm({form})
    console.log(validation.errors)
    setErrors(validation.errors)
    setIsFormValid(validation.valid)
    onChangeValidpassword(validation.errors.password!== undefined)
    }, [fullName,phone,confirmPassword, email, password]); 

    // console.log(errors,isFormValid,invalidpassword)
  
    const addUser = async (userId) => {
       
        try {
             await setDoc(doc(db, "users",userId), {
               fullname:fullName,
                email:email,
                phone:phone,
    
                
              
            });
            // console.log("Document written with ID: ", );
          } catch (e) {
            // console.error("Error adding document: ", e);
          }
    }
    

    const onFooterLinkPress = () => {
        navigation.navigate('login')
    }

    const onRegisterPress = async () => {

        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match", errorMessage, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            return
        }
        else if (password.length < 6 | !/[~`!#$%^&*+=-[\\\';,{}|\":<>?]/.test(password) | !/[A-Z]/.test(password)) {
            Alert.alert("Passwords don't meet minimum criteria", errorMessage, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            return
        }


        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                
                const user = userCredential.user;
                addUser(user.uid);
                // console.log()
                navigation.navigate('login')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Account creation error', errorMessage, [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                // ..
            });

    }

    return (<ImageBackground style={styles.loginBackground} source={logo} imageStyle={!hideBackGound? { resizeMode: "contain", height: "20%", marginTop: "20%" }:{display:'none'}}  >
<Pressable onPress={() =>onFooterLinkPress()}><Ionicons name="chevron-back" style={styles.loginBack} /></Pressable> 
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 5}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.registration}
            >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent:"flex-end" }}  >
                
                <View style={styles.registrationForm} >
                <Text style={styles.welcomeLogin} >Please register to continue</Text>
                    <TextInput  style={styles.logininput} placeholderTextColor="#6b6e70" placeholder='FullName' value={fullName} onChangeText={setFullName} onBlur={() => {  onhideBackGound(false),onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(true), onChangeformFieldFOcus(true)}} ></TextInput>
                    {formFieldFOcus && errors.name &&(
                        <Text style={styles.error}> 
                            {errors.name} 
                        </Text> )} 
                    <TextInput style={styles.logininput} placeholderTextColor="#6b6e70"  value={phone} onChangeText={onChangePhone} placeholder='Phone number' keyboardType='phone-pad'
                        clearButtonMode='always' onBlur={() => { onhideBackGound(false), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(true), onChangeformFieldFOcus(true)}}></TextInput>
                       {formFieldFOcus && errors.phone &&(
                        <Text style={styles.error}> 
                            {errors.phone} 
                        </Text> )} 
                    <TextInput style={styles.logininput}  placeholderTextColor="#6b6e70" placeholder='Email' onBlur={() => {  onhideBackGound(false),onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(true), onChangeformFieldFOcus(true)}} value={email} onChangeText={onChangeEmail} keyboardType={'email-address'} ></TextInput>
                    {formFieldFOcus && errors.email &&(
                        <Text style={styles.error}> 
                            {errors.email} 
                        </Text> )} 
                    <TextInput style={styles.logininput}  placeholderTextColor="#6b6e70" placeholder='Password'  value={password} onChangeText={onChangePassword} secureTextEntry={true} onFocus={() => { onChangeformFieldFOcus(true),onhideBackGound(true)}} onBlur={() => { onhideBackGound(false),onChangeformFieldFOcus(false),onhideBackGound(!hideBackGound)}}></TextInput>
                    {formFieldFOcus && errors.password &&(
                        <Text style={styles.error}> 
                            {errors.password} 
                        </Text> )} 
                    <TextInput style={styles.logininput}  placeholderTextColor="#6b6e70" placeholder='ConfirmPassword' onBlur={() => { onhideBackGound(false),onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(true), onChangeformFieldFOcus(true)}} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} ></TextInput>
                    {formFieldFOcus && errors.confirmPassword &&(
                        <Text style={styles.error}> 
                            {errors.confirmPassword} 
                        </Text> )} 
                    <View style={styles.buttonsView} >

                
                        <TouchableOpacity 
                style={[styles.loginButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                disabled={!isFormValid} 
                onPress={onRegisterPress} 
            > 
                            <Text style={styles.buttonText} >Register</Text>
                        </TouchableOpacity>
                        <Pressable  onPress={() =>onFooterLinkPress()}>
     
     <Text style={styles.backToLogin} >Back to login</Text>
   </Pressable>

                    </View>
              
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>

    )

}
