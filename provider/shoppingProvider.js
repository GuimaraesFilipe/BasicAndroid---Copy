import { createContext, useContext, useState, useEffect,useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config'
import { doc, getDoc, collection, query, where, getDocs, listCollections,setDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { useUser } from "./provider";

export const ShoppingContext = createContext(undefined);

export const ShoppingProvider = ({ children }) => {
  const  userId = useUser().uid;
  const [shoppingCart, setShoppingCart] = useState([])
  const [subTotal, setsubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [delivery, setDelivery] = useState(15)
  const [total, setTotal] = useState(15)
  
  const [deliveryLocation, setDeliveryLocation] = useState({latitude:null,longitude:null, address:null});
  const fetch=useUser().fetchuser
  let orders=[];
  const providedOrders=useUser().user.orders
  providedOrders !==undefined &&(orders=[...orders, ...providedOrders ])   
 
  
  const order={shoppingCart:shoppingCart,subTotal:subTotal,discount:discount,delivery:delivery,total:total,deliveryLocation:deliveryLocation}

  

 const addDeliveryLocation = (loc) => {
  setDeliveryLocation(loc)


  }

  const reOrder=(orderArray)=>{
 
   setShoppingCart(orderArray)

   
  }

  const addToCart = (item) => {
 
    if (shoppingCart.find(o => o.name === item.name)) {

      const existingItem = shoppingCart.find(o => o.name === item.name);
      existingItem.quantity = existingItem.quantity + item.quantity;
      existingItem.total = (existingItem.quantity * Number(item.price.replace('$', '')));
  
      setShoppingCart(shoppingCart)
      calcSubTotal(shoppingCart);

    } else {
      const arr = [...shoppingCart, item]
      setShoppingCart(arr)
      calcSubTotal(arr);
      // console.log('current shopping', arr)
    }


  }

  const removeFromCart = (itemName) => {
    const arr=shoppingCart
  
    arr.splice(shoppingCart.findIndex(o => o.name === itemName),1)
    
    setShoppingCart(shoppingCart);

    calcSubTotal(arr);

  }

  const changeQuantity=(itemName,ItemQuantity)=>{
    const existingItem = shoppingCart.find(o => o.name === itemName);
    existingItem.quantity = ItemQuantity;
    existingItem.total = (existingItem.quantity * Number(existingItem.price.replace('$', '')));
    // console.log(existingItem)
  
    setShoppingCart(shoppingCart)
    calcSubTotal(shoppingCart);

  }

  const calcTotal=(value,promo, del)=>{
    // console.log('calc',promo,del,subTotal)

    if(promo!==undefined && del!==undefined)
    {
      // console.log('primeiro',promo,del)
      setTotal(value-promo+del)

    }
    else if (promo){
  
      setTotal(value-promo+delivery)

    }
    else
    setTotal(value-discount+delivery)
  }

  const calcSubTotal= (shopping)=>{
    let subTotal2=0
    if(shopping.length>0){
      shopping.map(item=>{
        subTotal2=subTotal2+item.total
        //  console.log(subTotal2);
         setsubTotal(subTotal2);
        calcTotal(subTotal2)
       })

    }
else {
  setsubTotal(0);
  calcTotal(0)

} 
  }

const calcDiscount=(code)=>{
  let promo;
  let del;
  switch (code) {
    case "code10":
      {
      promo=10;
      del=15;
      setDiscount(promo)
      setDelivery(del)
      calcTotal(subTotal,promo,del)}

      break;
      case "code5":
        promo=5;
        del=15;
        setDiscount(promo)
        setDelivery(del)
      calcTotal(subTotal,promo,del)

      break;
      case "code5%":
        promo=(subTotal *5)/100;
        del=15;
        setDiscount(promo)
        setDelivery(del)
      calcTotal(subTotal,promo,del)

      break;
      case "freeDelivery":
        promo=0;
        del=0;
      setDiscount(promo)
      setDelivery(del)
      calcTotal(subTotal,promo,del);

      break;
    default:
      setDiscount(0)
      break;
  }

}



const completeOrder= async () => {
  let maxId = 0
  let yourDate = new Date()
  yourDate= Date.UTC(yourDate.getUTCFullYear(), yourDate.getUTCMonth(),
  yourDate.getUTCDate(), yourDate.getUTCHours(),
  yourDate.getUTCMinutes(), yourDate.getUTCSeconds());


 if(orders.length>0){
 maxId= Math.max(...orders.map(o => o.id)) 

 } 
  order.id=maxId+1
  order.dateTime=new Date(yourDate).toISOString()

  orders=[order,...orders]
  // console.log(orders)
  try {
    await setDoc(doc(db, "users", userId), {
      orders:orders
    }, { merge: true });
    fetch(userId);
    setShoppingCart([])
 
} catch (e) {
    alert("Error adding the card ", e);
  }
}

  return (
    <ShoppingContext.Provider
      value={{ shoppingCart, addToCart, removeFromCart,changeQuantity,subTotal,discount, calcDiscount, calcSubTotal,delivery,total,addDeliveryLocation,deliveryLocation,completeOrder,reOrder }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => useContext(ShoppingContext)



