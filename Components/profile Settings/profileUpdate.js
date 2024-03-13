import { useState,useEffect } from 'react';
import { View, Pressable, Text, ScrollView, TextInput, KeyboardAvoidingView, Alert, ImageBackground,TouchableOpacity } from 'react-native'
import styles from '../Style'
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'
import { doc, addDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import ImageUploader from '../image upload/imageUpload';
import { signInWithEmailAndPassword, verifyBeforeUpdateEmail ,sendEmailVerification} from 'firebase/auth';
import defaultimage from '../../assets/person1.png'
import { useValidator } from '../../provider/FormValidator';


export default function ProfileUpdate(props) {
    const validator=useValidator()
    const user = props.user
    const profileImage = props.user.profileImage
    const uid = props.uid
    const [fullName, setFullName] = useState(user.fullname)
    const [email, onChangeEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [state, setState] = useState(user.state)
    const [postcode, setPostcode] = useState(user.postcode)
    const [country, setCountry] = useState(user.country)
    const [formFieldFOcus, onChangeformFieldFOcus] = useState(false)

    const [city, setCity] = useState(user.city)
    const [phone, onChangePhone] = useState(user.phone)
    const [hideBackGound, onhideBackGound] = useState(false)
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 
    const [imageUplaoded, setImageUploaded]=useState('none')
    const form={
        type:'Update',
        name:fullName,
        email:email,
        currentEmail:user.email,
        phone:phone
    }
    useEffect(() => { 
    const validation=validator.validateForm({form})
    setErrors(validation.errors)
    setIsFormValid(validation.valid)
    }, [fullName,phone, email]); 
    // console.log(errors)
    console.log(user)

    const updateUser = async (userId) => {

        try {
            await setDoc(doc(db, "users", userId), {
                fullname: fullName,
                email: email,
                phone: phone,
                address:address? address:'',
                state:state ? state:'',
                postcode:postcode ? postcode:'',
                country:country ? country:'' ,
                city:city? city:''
            }, { merge: true });

            
            props.updated()
        } catch (e) {
            alert('User added bad data')
        }
    }



    const onFooterLinkPress = () => {
        props.backToSettings()
    }

    const onUpdatePress =  () => {

if(user.email !== email){
   // console.log('wrong email')
    verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {

        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Your email will be verified after verification')
            });
    }).catch((error) => {
        alert(error)
    });
}
        

        updateUser(uid);


    }

   // console.log(profileImage)

    return (

        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 2}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.registration}
        >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}  >

                <View  >
                    <ImageUploader profileImage={{ uri: profileImage }} imageUplaoded={(e)=>setImageUploaded(e)}></ImageUploader>
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='FullName' value={fullName} onChangeText={setFullName} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}}></TextInput>
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} value={phone} onChangeText={onChangePhone} placeholder='Phone number' keyboardType='phone-pad'
                        clearButtonMode='always'onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}}></TextInput>
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='Email' onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}}value={email} onChangeText={onChangeEmail} keyboardType={'email-address'} ></TextInput>
                    <TextInput  placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='Address' value={address} onChangeText={setAddress} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='Country' value={country} onChangeText={setCountry} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}}></TextInput>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TextInput placeholderTextColor="#6b6e70" style={styles.addrFields} clearButtonMode='always' placeholder='State' value={state} onChangeText={setState} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
                        <TextInput placeholderTextColor="#6b6e70" style={styles.addrFields} clearButtonMode='always' placeholder='Postcode' value={postcode} onChangeText={setPostcode} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}} ></TextInput>
                    </View>
                    <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='City' value={city} onChangeText={setCity} onBlur={() => {onhideBackGound(!hideBackGound), onChangeformFieldFOcus(false)}} onFocus={() =>{onhideBackGound(!hideBackGound), onChangeformFieldFOcus(true)}}></TextInput>
                    {Object.values(errors).map((error, index) => ( 
                        <Text key={index} style={styles.error}> 
                            {error} 
                        </Text> 
                    ))} 

                    <View style={styles.buttonsView} >
                    {imageUplaoded!='in progress' && (
                    <TouchableOpacity 
                style={[styles.updateUserButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                disabled={!isFormValid} 
             onPress={() => onUpdatePress()} >

                            <Text style={styles.buttonText} >Update User</Text>
                           
                        </TouchableOpacity>)}
                     
                        {imageUplaoded==='none' && (<Pressable onPress={() => onFooterLinkPress()}>

                            <Text style={styles.backToLogin} >Back to Settings</Text>
                        </Pressable>)}

                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>


    )

}
