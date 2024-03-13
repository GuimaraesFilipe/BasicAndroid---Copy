import * as react from 'react';
import styles from './Style.js';

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
import { useUser } from '../provider/provider.js';
import { Ionicons } from '@expo/vector-icons';
import { useShopping } from '../provider/shoppingProvider.js';
import * as Progress from 'react-native-progress';

import { Keyboard } from 'react-native'


export default function OrderHistory({ navigation }) {

  const orders = useUser().user.orders
  const reOrder = useShopping().reOrder
  const refreshTime = 6000
const [update, setupdate]=react.useState(0)

  const setDeliveryTime = (orderTime, deliveryTime) => {

    return new Date(orderTime.getTime() + deliveryTime * 60000)

  }

  const calcProgress = (dateTime) => {
    const km = 15
    const deliveryTime = km * 2
    const expectedDeliveryTime = setDeliveryTime(new Date(dateTime.split('GMT')[0]), deliveryTime)
    const currentLocalTime = new Date()
    if (currentLocalTime < expectedDeliveryTime) {
      const remainingTime = new Date(expectedDeliveryTime - currentLocalTime).getMinutes()
      
      // console.log(1-(remainingTime / (deliveryTime)))
      return (1-(remainingTime / (deliveryTime)))
    }
    else {
      return 1
    }

  }

  const itemSeparator = () => <View style={styles.itemSeparator} ></View>

  class Item extends react.PureComponent {

    render() {
      const km = 15
      const deliveryTime = km * 2
      const dateTime = new Date(this.props.date) + new Date().getTimezoneOffset()
      const date = new Date(dateTime.split('GMT')[0]).toLocaleDateString()
      const hours = setDeliveryTime(new Date(dateTime.split('GMT')[0]), deliveryTime).getHours()
      const minutes = setDeliveryTime(new Date(dateTime.split('GMT')[0]), deliveryTime).getMinutes()
      const expectedDelivery = setDeliveryTime(new Date(dateTime.split('GMT')[0]), deliveryTime).toISOString()
      const expectedDeliveryTime = setDeliveryTime(new Date(dateTime.split('GMT')[0]), deliveryTime).toLocaleTimeString()
      const currentLocalDate = new Date().toISOString()
      const currentLocalTime = new Date().toLocaleTimeString()
      const progress = calcProgress(dateTime)
      return (
        <View>

          <Text style={styles.orderDate}> {date} </Text>

          <View style={styles.pricingContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Text style={{ fontSize: 14, textAlign: "center", alignSelf: "center" }}>{currentLocalDate > expectedDelivery ? '🟢' : '🟡'}</Text>
                <Text style={styles.orderTitle}> {currentLocalDate > expectedDelivery ? 'Order completed' : 'Order in Progress'} </Text>
              </View>
              <Text style={styles.orderTitle}> {`${hours}:${minutes}`}</Text>
            </View>
            {expectedDelivery > currentLocalDate && (
            <View style={{ flexDirection: 'row' }}>
              <Progress.Bar progress={progress} width={200}  color='#F4CE14'  />
              
               </View>)}
            <View >
              {this.props.cart.map(item => {
                return (<View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                  <Text style={styles.pricingText}>{item.quantity}</Text>
                  <Text style={styles.pricingText}> {item.name}</Text>
                </View>)

              })}
            </View>

            <View style={styles.pricingSeparator} ></View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.pricingText} >Total:</Text>
              <Text style={styles.pricingText} >${this.props.total}</Text>
            </View>

            <Pressable style={styles.reOrder} onPress={() => { reOrder(this.props.cart); navigation.navigate('shoppingCart') }} >

              <Text style={styles.buttonText} >Order Again</Text>
            </Pressable>
          </View>
        </View>
      )
    }
  }
  const renderItem = ({ item }) => {


    return (<>

      <Item Key={item.id} total={item.total} deliveryLocation={item.deliveryLocation} date={item.dateTime} cart={item.shoppingCart}  ></Item>

    </>
    )
  }
  return (
    <View keyboardShouldPersistTaps="handled" indicatorStyle={"grey"} style={styles.paymentOptionsPage}>

      {/* <View style={styles.shoppingHeader}> 
    <Pressable onPress={() =>onFooterLinkPress()}><Ionicons name="chevron-back" style={styles.shoppingBack} /></Pressable> 
        <Text style={styles.menuOptionNames} >My Cart</Text>
  
    </View> */}

      <Text style={styles.paymentTitle}> Order History </Text>

      {orders !== undefined && orders.length > 0 ? <FlatList ItemSeparatorComponent={itemSeparator} data={orders} keyExtractor={(item, index) => item.key} renderItem={renderItem} indicatorStyle='white' />
        : <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.noOrders}> No orders yet. </Text>
          <Pressable style={styles.reOrder} onPress={() => { navigation.navigate('MenuCat') }} >

            <Text style={styles.buttonText} >Order now!</Text>
          </Pressable>
        </View>
      }




    </View>
  );
}