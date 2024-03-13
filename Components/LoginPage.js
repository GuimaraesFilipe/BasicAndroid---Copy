import * as react from 'react';
import { View, Pressable, Text, ScrollView, TextInput, KeyboardAvoidingView, ImageBackground,TouchableOpacity,Alert } from 'react-native'
import styles from './Style'
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config'
import logo from '../assets/littleLogo.png'
import { useValidator } from '../provider/FormValidator';
import PasswordRecovey from './Password Recovery/passwordRecovery';
import { useUser } from "../provider/provider.js";
import Config from "react-native-config";
export default function LoginPage({ navigation }) {


    const validator=useValidator()
    const [modalVisible, setModalVisible] = react.useState(false);

    const [email, onChangeEmail] = react.useState('')
    const [password, onChangePassword] = react.useState('')
    const [loggedIn, onChangeloggedIn] = react.useState(false)
    const [hideBackGound, onhideBackGound] = react.useState(false)
    const [errors, setErrors] = react.useState({}); 
    const [isFormValid, setIsFormValid] = react.useState(false); 
    const [formFieldFOcus, onChangeformFieldFOcus] = react.useState(false)
    const form={
        type:'Login',
        email:email,
        password:password,
   
    }
    react.useEffect(() => { 
        const validation=validator.validateForm({form})
        setErrors(validation.errors)
        setIsFormValid(validation.valid)
        }, [ email, password]); 
    
        // console.log(errors,isFormValid)
  
    const handleSubmit = () => { 
        if (isFormValid) { 
  
            // Form is valid, perform the submission logic 
            // console.log('Form submitted successfully!'); 

            onLogin();
        } else { 
              
            // Form is invalid, display error messages 
            // console.log('Form has errors. Please correct them.'); 
        } 
    }; 
  
    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLogin = () => {
  
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if(user){
                    navigation.navigate('Home')
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Wrong Email or Password', errorMessage, [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
               
            });

    }



    return (
        
        <ImageBackground style={styles.loginBackground} source={logo} imageStyle={!hideBackGound? { resizeMode: "contain", height: "25%", marginTop: "25%" }:{display:'none'}}  >
{modalVisible && (<PasswordRecovey showItem={modalVisible} email={email} showHide={() => setModalVisible(!modalVisible)}></PasswordRecovey>)}
<KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 1}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.registration}
            >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <View style={{ flex: 0.4, justifyContent: "center" }} >
                <Text style={styles.welcomeLogin} >Welcome to Little Lemon</Text>

                    <TextInput style={styles.logininput} placeholder='Email ' placeholderTextColor="#6b6e70" value={email} onChangeText={onChangeEmail} keyboardType={'email-address'} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
                    <TextInput style={styles.logininput} placeholder='Password ' placeholderTextColor="#6b6e70" value={password} onChangeText={onChangePassword} secureTextEntry={true} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
                    
                    {formFieldFOcus &&(Object.values(errors).map((error, index) => ( 
                        <Text key={index} style={styles.error}> 
                            {error} 
                        </Text> 
                    )))} 
                    <View style={styles.buttonsView} >
                   
                    <TouchableOpacity 
                style={[styles.loginButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                disabled={!isFormValid} 
                onPress={handleSubmit} 
            > 
                        <Text style={styles.buttonText} >Log in </Text>
                    </TouchableOpacity>

                    <Pressable style={{paddingTop:"10%"}} onPress={() => setModalVisible(!modalVisible)} > 
                        <Text style={styles.buttonText} >Forgot your <Text style={styles.underlineTXT} >password?</Text></Text>
                    </Pressable>
                    </View>
                  
                </View>
                <Pressable style={{ flex:0.05,justifyContent: "flex-start"  }} onPress={() => onFooterLinkPress()}>

<Text style={styles.registerTXT} >Don't have an account? <Text style={styles.underlineTXT} >Create new</Text>  </Text>

</Pressable>
            </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>


    )

}
