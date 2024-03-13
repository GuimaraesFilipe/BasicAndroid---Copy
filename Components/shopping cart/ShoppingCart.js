import * as react from 'react';
import { View, Text, ScrollView, Pressable, Image, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from '../Style'
import { Ionicons } from '@expo/vector-icons';
import { useShopping } from '../../provider/shoppingProvider';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native'
import Order from './Order';
import Locator from './Location';
import { useUser } from "../../provider/provider.js";


export default function ShoppingCart({ navigation }) {
  const menuItemsToDisplay = useShopping().shoppingCart;
  const changeQuantity = useShopping().changeQuantity;
  const getLoc = useUser().getLoc;
  const providedLoc = useUser().location;
  const providedAddress = useUser().address;
  const setDelivery = useShopping().addDeliveryLocation;
  const setDiscount = useShopping().calcDiscount;
  const completeOrder = useShopping().completeOrder;
  const [finalize, setfinalize] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [render, setRender] = useState(false)
  const removeItem = useShopping().removeFromCart;
  const [itemNo, setItemNo] = react.useState();




  useEffect(() => {
    if (providedLoc) {
      setDelivery({ latitude: providedLoc.latitude, longitude: providedLoc.longitude, address: providedAddress })
      setSelectedLocation({ latitude: providedLoc.latitude, longitude: providedLoc.longitude, address: providedAddress })
    } else {
      (async () => {

        let loc = await getLoc();
        setDelivery(loc)
        setSelectedLocation(loc)
      })();
    }
  }, []);



  const add = (name, quantity) => {
    newValue = Number(quantity)+1;
  changeQuantity(name,newValue)
  setRender(!render)
  }
  const remove = (name,quantity) => {
    newValue = Number(quantity) -1;
    changeQuantity(name,newValue)
    setRender(!render)

  }

  const removeFromCart = (name) => {
    removeItem(name);

    setRender(!render)

  }
  const calcDiscount = (code) => {
    setDiscount(code);
    setRender(!render);
    setPromoCode('')
    Keyboard.dismiss();
  }







  const itemSeparator = () => <View style={styles.itemSeparator} ></View>
  class Item extends react.PureComponent {
  
    render() {
      
      return (
        <View style={styles.shoppingContainer}>
          <Image
            source={this.props.image ? { uri: `${this.props.image}` } : { uri: 'https://th.bing.com/th/id/OIP.0dDro_bGcycAl4f7UoQulgHaHZ?pid=ImgDet&rs=1' }}
            imageStyle={{ borderRadius: 20 }}
            resizeMode="cover"
            style={styles.shoppingItemImage} />
          {/* <Image style={styles.shoppingItemImage} source={this.props.image ? { uri: this.props.image } : { uri: 'https://th.bing.com/th/id/OIP.0dDro_bGcycAl4f7UoQulgHaHZ?pid=ImgDet&rs=1' }} resizeMode="center"></Image> */}

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={styles.itemText}>
              {this.props.name}
            </Text>
            {/* <Text style={styles.itemDesc}>
          {this.props.description}
        </Text> */}
            <Text style={styles.itemPrice}>
              ${this.props.total}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Pressable onPress={() => removeFromCart(this.props.name)}><Ionicons name="close" style={styles.removeItem} /></Pressable>

            <View style={styles.addingItem}>
              <Pressable onPress={() => remove(this.props.name,this.props.quantity)}>
                <Ionicons name="remove-outline" size={30} />
              </Pressable>
              <View   style={styles.numericInput2}> 
              <Text 
            style={styles.numericText}
          >{this.props.quantity}</Text>
          </View>
              <Pressable onPress={() => add(this.props.name, this.props.quantity)} >
                <Ionicons name="add-outline" size={30} />
              </Pressable>


            </View>
          </View>

        </View>
      )
    }
  }
  const renderItem = ({ item }) => {
    // console.log(item)
    return (<>

      <Item name={item.name} quantity={item.quantity} price={item.price} total={item.total} image={item.image}></Item>

    </>
    )
  }
  return (
    <>{providedLoc ? (<View keyboardShouldPersistTaps="handled" indicatorStyle={"grey"} style={styles.shoppingPage}>


      <Text style={styles.menuItemTitle}> My Food Cart </Text>


      {deliveryLocation && (<Locator setLoc={(e) => setSelectedLocation(e)}></Locator>)}

      {!deliveryLocation && (<View style={{ flex: 1 }}>
        <View style={styles.shoppingSummary}  >
          {menuItemsToDisplay.length > 0 ? <FlatList ItemSeparatorComponent={itemSeparator} data={menuItemsToDisplay} keyExtractor={(item, index) => item.key} renderItem={renderItem} indicatorStyle='white' />
            : <Text style={styles.NoItems}> No items seleceted yet. </Text>
          }

        </View>
        <Order setDeliveryLocation={() => { setDeliveryLocation(!deliveryLocation); console.log('pressed') }} ></Order>
      </View>)}


      {!deliveryLocation && (
        <TouchableOpacity style={[styles.orderButton, { opacity: menuItemsToDisplay.length > 0 ? 1 : 0.5 }]} onPress={() => { completeOrder(), navigation.navigate('Orders') }} disabled={!menuItemsToDisplay.length > 0}  >

          <Text style={styles.buttonText} adjustsFontSizeToFit={true} >{deliveryLocation ? 'Confirm Location' : 'Confirm Order'}</Text>
        </TouchableOpacity>)}
      {deliveryLocation && (
        <Pressable style={styles.orderButton} onPress={() => { setDeliveryLocation(!deliveryLocation); setDelivery(selectedLocation) }} >

          <Text style={styles.buttonText} >{deliveryLocation ? 'Confirm Location' : 'Confirm Order'}</Text>
        </Pressable>)}


    </View>) : (<View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#f4ce14" />
    </View>)}



    </>

  )
}