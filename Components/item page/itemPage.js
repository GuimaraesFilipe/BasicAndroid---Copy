import * as react from 'react';
import { View, Text, ScrollView, Pressable, Image, Modal, Alert, TextInput, Button } from 'react-native'
import styles from '../Style'
import restaurant from '../../assets/greeksalad.jpg'
import main from '../../assets/steak.jpg'
import CategoryButtons from '../CategoyButtons.js';
import CustomerFeedback from '../CustomerFeedback';
import { Ionicons } from '@expo/vector-icons';

import { useShopping } from '../../provider/shoppingProvider';



export default function ItemPage(props) {
  const addItem = useShopping().addToCart
  const [modalVisible, setModalVisible] = react.useState(props.showItem);
  const [specialReq, setSpecialReq] = react.useState();
  const [itemNo, setItemNo] = react.useState('1');
  const [finalPrice, setFinalPrice] = react.useState(Number(props.price.replace('$', '')))
  const itemToBeAdded = {
    name: props.name,
    image: props.image,
    quantity: itemNo,
    price: props.price,
    total: finalPrice
  }

  const add = () => {
    let newValue =Number(itemNo) +1;
    newValue=String(newValue)
    console.log(typeof(newValue))
    setItemNo(String(newValue))
    calculatePrice(Number(newValue))

  }
  const remove = () => {
   const newValue =Number(itemNo)-1;
    setItemNo(String(newValue))
    calculatePrice(Number(newValue))

  }
  const calculatePrice = (value) => {
    console.log(value)
    itemToBeAdded.quantity = Number(value);

    setFinalPrice
      (value * Number(props.price.replace('$', '')));

    setItemNo(value);

  }

  const addToCart = () => {

    addItem(itemToBeAdded);
    props.cartPage();
    props.showHide();

  }
  return (
    < Modal
      animationType="fade"
      presentationStyle='formSheet'
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>

      <ScrollView keyboardShouldPersistTaps="handled" indicatorStyle={"grey"} style={styles.scrollModal}>
        <View style={styles.itemModal}>


          <Pressable onPress={() => props.showHide()}><Ionicons name="chevron-down" style={styles.menuBack} /></Pressable>
          <Text style={styles.menuOptionNames} >{props.name}</Text>
        </View>
        <Image
          source={props.image ? { uri: `${props.image}` } : { uri: 'https://th.bing.com/th/id/OIP.0dDro_bGcycAl4f7UoQulgHaHZ?pid=ImgDet&rs=1' }}

          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
          style={styles.modalImage} />
        {/* <Image style={styles.modalImage} source={{uri:props.image}} resizeMode="cover"></Image> */}
        <View style={styles.menuDetModal}>
          <Text style={styles.reviewLabelModal}>({props.reviews}) ⭐⭐⭐⭐⭐ </Text>
          <Text style={styles.dishDetModal} >{props.description} </Text>
          <Text style={styles.dishPriceModal} >Price:{props.price} </Text>
        </View>
        <View style={styles.special}>
          <Text style={styles.specialText} >Special request</Text>
        </View>

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={80}
          inputMode="text"
          placeholder="Your preferences or requests"
          placeholderTextColor="#6b6e70"
          value={specialReq}
          onChangeText={text => setSpecialReq(text)}
          style={{ borderColor: "#EDEFEE", borderWidth: 2, minHeight: "10%", marginHorizontal: 10 }}
        />

      </ScrollView>
      <View style={styles.orderQuantityModal}>
        <View style={styles.addingItem}>
          <Pressable onPress={() => remove()}>
            <Ionicons name="remove-outline" size={40} />
          </Pressable>
          <View   style={styles.numericInput}> 
          <Text
            style={styles.numericText}
         
          >{itemNo}</Text>
            </View>
          <Pressable onPress={() => add()} >
            <Ionicons name="add-outline" size={40} />
          </Pressable>


        </View>

        <Pressable style={styles.addToCart} onPress={() => addToCart()}>
          <Text style={styles.buttonText} >Add to Cart </Text>
          <Text style={styles.buttonText} > ${finalPrice} </Text>
        </Pressable>
      </View>
    </Modal>


  )
}