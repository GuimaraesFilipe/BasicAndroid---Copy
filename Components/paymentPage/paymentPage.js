import * as react from 'react';
import styles from '../Style.js';
import { useState,useEffect } from 'react';
import { doc, addDoc, setDoc, getDoc} from "firebase/firestore";
import { db } from '../../firebase/config';
import { Platform } from 'react-native';

import { useValidator } from '../../provider/FormValidator';
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
import { Ionicons } from '@expo/vector-icons';
import cardLogo from '../../assets/cards.jpg'     
import CardTypes from './cardType.js';
import { Keyboard } from 'react-native'

export default function PaymentPage ({ navigation }) {
  const fetch=useUser().fetchuser
  const validator=useValidator();
  const  userId = useUser().uid;
  const [user,setUser] = useState(useUser().user);
  let cards=useUser().user.cards? useUser().user.cards :[]
 const PaymentItemsToDisplay=[]
 const [name, setName] = useState('')
 const [number, setNumber] = useState()
 const [date, setDate] = useState()
 const [cvv, setCvv] = useState()
 const [errors, setErrors] = useState({}); 
 const [hideBackGound, onhideBackGound] = useState(false)
 const [isFormValid, setIsFormValid] = useState(false); 
 const [refresh, setRefresh] = useState(false); 
 const form={
     type:'Card',
     email:user.email,
     name:name,
     number:number,
     expiryDate:date,
     cvv:cvv
 }
 useEffect(() => { 
 const validation=validator.validateForm({form})
 setErrors(validation.errors)
 setIsFormValid(validation.valid)
 }, [name,number,cvv,date]); 


const card={
  name:name,
  number:number,
  expiryDate:date,
  cvv:cvv
}
// const fetchuser= async () => {
//   // console.log('fetch called')
//   const docSnap= await getDoc(doc(db, "users",userId));
//   cards=docSnap.data().cards
//   setUser(docSnap.data())

// }

 const updateUser = async (userId) => {
console.log(userId)
  try {
      await setDoc(doc(db, "users", userId), {
        cards:cards
      }, { merge: true });
      fetch(userId);
      
  } catch (e) {
      console.log("Error adding the card ");
    }
   
}

const checkCards=()=>{

  if(!cards.find(o=>o.number===card.number)){
    cards.push(card)

    updateUser(userId);
  }else{
    alert('This card is already added to your list')
  }
  setRefresh(!refresh)
  Keyboard.dismiss;


}

const addCard=(userId)=>{
  if(cards===undefined){
    cards=[];
  }

  checkCards();
 

}
const removeFromCards= (itemNumber) => {

  cards.splice(cards.findIndex(o => o.number === itemNumber),1)
  
  updateUser(userId);
  setRefresh(!refresh)



}


const itemSeparator = () => <View style={styles.itemSeparator} ></View>

class Item extends react.PureComponent {
  render() {
    return (
      <View style={styles.paymentContainer}>

      <CardTypes number={this.props.number}></CardTypes>
      <View style={{paddingHorizontal:"5%"}} >
      <Text style={styles.cardNumber}>
            {'**** **** ****'+ this.props.number.toString().slice(-4)}
          </Text>
      <Text style={styles.cardNumber}>
            {'expires'+this.props.date.toString().slice(0,2)+'/' +this.props.date.toString().slice(-2)}
          </Text>
      </View>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Pressable onPress={()=>removeFromCards(this.props.number)}><Ionicons name="close" style={styles.removeItem} /></Pressable>

        </View>
        
      </View>
    )
  }
}
const renderItem = ({ item }) => {
  // console.log(item)
  return (<>
   
      <Item name={item.name} number={item.number} date={item.expiryDate}   image={item.image}></Item>
    
  </>
  )
}
  return (
    <View  keyboardShouldPersistTaps="handled" indicatorStyle={"grey"} style={styles.paymentOptionsPage}>

    {/* <View style={styles.shoppingHeader}> 
  <Pressable onPress={() =>onFooterLinkPress()}><Ionicons name="chevron-back" style={styles.shoppingBack} /></Pressable> 
      <Text style={styles.menuOptionNames} >My Cart</Text>

  </View> */}
  <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
  <Pressable onPress={ ()=>navigation.navigate('ProfileSettings')} ><Ionicons name="chevron-back" style={styles.PaymentBack} /></Pressable> 
      <Text style={styles.paymentTitle}> Your payment options </Text>
  </View>


    <View style={!hideBackGound? styles.shoppingList:{display:"none"}}  >
     {cards && cards.length>0 && cards!==undefined?<FlatList ItemSeparatorComponent={itemSeparator} data={cards} keyExtractor={(item,index) => item.key} renderItem={renderItem} indicatorStyle='white' />
:         <Text style={styles.NoItems}> No payment options added yet. </Text>
} 

    </View>
  
    <Image style={styles.cardLogo} source={cardLogo} resizeMode="contain"></Image>
    <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 2}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.pricingContainer}
        >
           <ScrollView keyboardShouldPersistTaps="handled">
    <View  style={{flexDirection:"row", justifyContent:"center"}}>
      <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='Name' value={name} onChangeText={setName} onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }} ></TextInput>

      </View>
      <View style={styles.pricingSeparator} ></View>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
      <TextInput placeholderTextColor="#6b6e70" style={styles.logininput} clearButtonMode='always' placeholder='Card Number' value={number} onChangeText={setNumber} keyboardType={'number-pad'} maxLength={16} onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }}></TextInput>

      </View>
      <View style={styles.pricingSeparator} ></View>
      <View style={{flexDirection:"row", justifyContent:"center"}}>

      <TextInput placeholderTextColor="#6b6e70" style={styles.cardDateInput} clearButtonMode='always' placeholder='Expiry Date'maxLength={4}  value={date} onChangeText={setDate} keyboardType={'number-pad'}onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }} ></TextInput>

      <TextInput placeholderTextColor="#6b6e70" style={styles.CVVInput} clearButtonMode='always' placeholder='CVV' value={cvv} maxLength={3} onChangeText={setCvv} keyboardType={'number-pad'} onFocus={() => { onhideBackGound(true) }} onBlur={() => {onhideBackGound(false) }}></TextInput>
    </View>
    
   
    {hideBackGound&&(Object.values(errors).map((error, index) => ( 
                        <Text key={index} style={styles.error}> 
                            {error} 
                        </Text> 
                    )))} 
                         
    <TouchableOpacity 
                        style={[styles.updateUserButton, { opacity: isFormValid ? 1 : 0.5 }]} 
                        disabled={!isFormValid} 
                    onPress={() =>{addCard(userId); Keyboard.dismiss();}} >
                      

<Text style={styles.buttonText} >Add Card</Text>
</TouchableOpacity>
</ScrollView>
</KeyboardAvoidingView>
  </View>
  );
   
}

