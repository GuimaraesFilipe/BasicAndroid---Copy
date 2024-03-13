import { useState, useEffect} from 'react';
import { View, Pressable, Text, ScrollView, TextInput, KeyboardAvoidingView, Alert,TouchableOpacity,ImageBackground } from 'react-native'
import styles from '../Style'
import { Platform } from 'react-native';
import { auth } from '../../firebase/config'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useValidator } from '../../provider/FormValidator';
import logo from '../../assets/littleLogo.png'
import { Ionicons } from '@expo/vector-icons';


export default function ChangePassword(props) {
    const validator=useValidator()
    const user = props.user
    const uid = props.uid
    const [currentPassword, onChangeCurrentPassword] = useState('')
    const [password, onChangePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validpassword, onChangeValidpassword] = useState(false)
    const [passwordFocus, onChangepasswordFocus] = useState(false)
    const [errors, setErrors] = useState({}); 
    const [hideBackGound, onhideBackGound] = useState(false)

    const [isFormValid, setIsFormValid] = useState(false); 
    const form={
        type:'Password',
        email:user.email,
        currentPassword:currentPassword,
        password:password,
        confirmPassword:confirmPassword
    }
    useEffect(() => { 
    const validation=validator.validateForm({form})
    setErrors(validation.errors)
    setIsFormValid(validation.valid)
    }, [password,confirmPassword,currentPassword]); 
    // console.log(errors)



    const checkPassword = (e) => {

        onChangePassword(e)
        onChangeValidpassword(false)

        if (e.length < 6 | !/[~`!#$%^&*+=-[\\\';,{}|\":<>?]/.test(e) | !/[A-Z]/.test(e)) {
            onChangeValidpassword(false)
        } else {
            onChangeValidpassword(true)
            onChangepasswordFocus(false)
            // console.log(validpassword)
        }


    }



    const onFooterLinkPress = () => {
        props.backToSettings()
    }

    const onUpdatePress = async () => {
        signInWithEmailAndPassword(auth, user.email, currentPassword)
            .then((userCredential) => {
                updatePassword(auth.currentUser, password).then(() => {
                    alert('Password updated');
                    props.backToSettings()

                }).catch((error) => {
                    alert('Password updated failed');
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
                onChangeCurrentPassword('');
                onChangePassword('');
                setConfirmPassword('');
                alert('Wrong current password')
            });


    }

    return (
        <ImageBackground style={styles.loginBackground} source={logo} imageStyle={!hideBackGound? { resizeMode: "contain", height: "25%", marginTop: "25%" }:{display:'none'}}  >

        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 2}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.registration}
        >
                    <Pressable onPress={() =>onFooterLinkPress()}><Ionicons name="chevron-back" style={styles.passwordBack} /></Pressable> 

            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow:1, justifyContent:"flex-end" }}  >

                <View style={{ flex: 1, justifyContent: "flex-end"}}    >
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} placeholder='Curent Password' value={currentPassword} onChangeText={onChangeCurrentPassword} secureTextEntry={true}  onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }}></TextInput>

                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} placeholder='Password' value={password} onChangeText={checkPassword} secureTextEntry={true} onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }}></TextInput>
            
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}  onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }}></TextInput>
                
                    <View style={styles.buttonsView} >
                    {hideBackGound &&(Object.values(errors).map((error, index) => ( 
                        <Text key={index} style={styles.error}> 
                            {error} 
                        </Text> 
                    )))} 
                            <TouchableOpacity 
                        style={[styles.updateUserButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                        disabled={!isFormValid} 
                    onPress={() => onUpdatePress()} >
                      

                            <Text style={styles.buttonText} >Update User</Text>

                        </TouchableOpacity>

                        <Pressable onPress={() => onFooterLinkPress()}>

                            <Text style={styles.backToLogin} >Back to Settings</Text>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>

    )

}
