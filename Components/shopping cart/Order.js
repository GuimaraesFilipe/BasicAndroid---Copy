import * as react from 'react';
import styles from '../Style.js';
import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config.js';

import { useValidator } from '../../provider/FormValidator.js';
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
  Alert,
  Select
} from 'react-native';

import { useUser } from "../../provider/provider.js";
import { Ionicons } from '@expo/vector-icons';

import CardTypes from '../paymentPage/cardType.js';

import { Keyboard } from 'react-native'

import { Dropdown } from 'react-native-element-dropdown';
import { useShopping } from '../../provider/shoppingProvider';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Order(props) {
  
  const changeQuantity=useShopping().changeQuantity;
  const calcSubTotal=useShopping().calcSubTotal;
  const subTotal=useShopping().subTotal;
  const discount=useShopping().discount;
  const delivery=useShopping().delivery;
  const deliveryAddr=useShopping().deliveryLocation;
  const setDiscount=useShopping().calcDiscount;
  const payTotal=useShopping().total;
  const validator = useValidator();
  const userId = useUser().uid;
  const cards = useUser().user.cards
  const [user, setUser] = useState(useUser().user);
  const PaymentItemsToDisplay = []
  const [name, setName] = useState('')
  const [number, setNumber] = useState()
  const [date, setDate] = useState()
  const [cvv, setCvv] = useState()
  const [errors, setErrors] = useState({});
  const [hideBackGound, onhideBackGound] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const[promoCode,setPromoCode]=useState('')
  const userAdress=useUser().address
  const [render, setRender] = useState(false)

  



  const ref = useRef();  
  useEffect(() => {
    ref.current?.setAddressText('Some Text');
    if(cards && cards.length>0){
      cards.map((item, index) => {
    

        if(!items.find(o=>o.value===item.number)){
        items.push({
      
          label:'**** **** ****' + item.number.toString().slice(-4),
          value: item.number
        })} 
   
      });
    }
 
    setValue(items[0])

  }, [])

  const calcDiscount=(code)=>{
    setDiscount(code);
    setRender(!render);
    setPromoCode('')
    Keyboard.dismiss();
  }



  const updateUser = async (userId) => {
    // console.log(userId)
    try {
      await setDoc(doc(db, "users", userId), {
        cards: cards
      }, { merge: true });

    } catch (e) {
      alert("Error adding the card ");
    }

  }

  const checkCards = () => {
    if (!cards.find(o => o.number === card.number)) {
      cards.push(card)
      updateUser(userId);
    } else {
      alert('This card is already added to your list')
    }
    setRefresh(!refresh)
    Keyboard.dismiss;


  }

  const renderItem = item => {

    return (
      <View style={styles.item}>
       <CardTypes number={item.value}></CardTypes> 
 <Text style={styles.cardNumber}>{'**** **** ****' + item.value.toString().slice(-4)}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };




  return (

    <>


    
   
        
        <View style={styles.orderContainer}>
        <Text style={styles.orderLabel}>Location:</Text>
<Pressable style={{flexDirection:"row"}} onPress={()=>props.setDeliveryLocation()}>
<Text style={styles.LocationField}  value={promoCode} onChangeText={setPromoCode}  disabled={true} numberOfLines={1}>{deliveryAddr? deliveryAddr.address :userAdress}</Text>

</Pressable>

</View>
<View style={styles.orderContainer}>
        <Text style={styles.orderLabel}>Payment Method:</Text>
        
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
        
      </View>
      <View style={styles.orderContainer}>

      <Text style={styles.orderLabel}>Promo Code:</Text>
      <View style={{flexDirection:"row"}}>
<TextInput  placeholderTextColor="#6b6e70" style={styles.promoCode} placeholder='Enter Promo Code' value={promoCode} onChangeText={setPromoCode}  ></TextInput>
<Pressable style={styles.applyButton} onPress={()=>calcDiscount(promoCode)} >

  <Text style={styles.buttonText} adjustsFontSizeToFit={true} >Apply</Text>

</Pressable>
</View>
</View>
      <View style={ styles.pricingContainer}>
     <View style={{flexDirection:"row", justifyContent:"space-between"}}>
     <Text style={styles.pricingText} >Subtotal:</Text>
     <Text style={styles.pricingText} >${subTotal}</Text>
     </View>
     <View style={styles.pricingSeparator} ></View>
     <View style={{flexDirection:"row", justifyContent:"space-between"}}>

   <Text style={styles.pricingText} >Discount:</Text>
   <Text style={styles.pricingText} >-${discount}</Text>
   </View>
   <View style={styles.pricingSeparator} ></View>
   <View style={{flexDirection:"row", justifyContent:"space-between"}}>

<Text style={styles.pricingText} >Delivery:</Text>
<Text style={styles.pricingText} >${delivery}</Text>
</View>
<View style={styles.pricingSeparator} ></View>
<View style={{flexDirection:"row", justifyContent:"space-between"}}>

   <Text style={styles.pricingTotal} >Total:</Text>
   <Text style={styles.pricingTotal} >${payTotal}</Text>
   </View>
     </View>
  
    

      {/* <Pressable style={styles.orderButton} onPress={() => setDeliveryLocation('something')} >

        <Text style={styles.buttonText} >{deliveryLocation? 'Confirm Order':'Confirm Location' }</Text>
      </Pressable> */}
    </>


  );

}

