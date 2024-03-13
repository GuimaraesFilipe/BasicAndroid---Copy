
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#495e57',
    
   


  },
  containerDark: {
    flex: 1,
    backgroundColor: '#222222',



  },
error:{
  color:'red',
  textAlign:"center",
  fontSize:11,
  paddingVertical:"1vh"
},

  //Header Component
  header: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection:"row",
    justifyContent:"center",
  

  },
  headerTitle: {
    
    fontSize: 32,
    fontWeight: "600",
    
  },
  headerLogoTab:{
    alignSelf:"flex-start",
     width:40,
     height:40,
     borderRadius:20
   },
 
  headerLogo:{
   alignSelf:"flex-start",
    width:55,
    height:55,
    borderRadius:20
  },

  //footer component
  footer: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0
  },
  footerText: {
    fontSize: 12,
    fontWeight: "400",
    padding: 15
  },

  //Welcome component
  welcome: {
    alignItems: 'center',
    flex: 1,
  
  },
  welcomeSmall:{
    flex:0.30,
    marginBottom:10
  },
  welcomeTitle: {
    color: '#F4CE14',
    fontSize: 37,
    paddingBottom: 40,
    textAlign: "center"
  },
  welcomeText: {
    color: 'white',
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    textAlign: "center"
  },
  scrollWelcome: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:"3%"

  },
  welcomeContent: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
    borderColor:"red"

  },
  menuIcons: {
    color: '#6b6e70',
    fontSize: 37,
    textAlign: "center",
  },
 
  menuOptions: {
    flex: 1,
   paddingTop:20,
    flexDirection:"row",
    justifyContent:"space-between",
    
  },
  menuDet: {
    flex: 1,
   paddingTop:5,
    justifyContent:"flex-start",
    
  },
  menuOption: {
   flex:1,
   
   padding:0,
   
 
   
  },
  menuOptionNames: {
    color: 'black',
    fontSize: 28,
    textAlign: "center",
    fontWeight:"bold",
    paddingLeft:20
   
  },
  menuDetNames: {
    color: 'black',
    fontSize: 22,
    textAlign: "left",
    fontWeight:"bold",
    paddingLeft:20
   
  },

  viewmore: {
    color: 'red',
    fontSize: 13,
    textAlign: "left",
    paddingRight:20,
    alignSelf:"center"
  },
  reviewLabel: {
    color: '#6b6e70',
    fontSize: 11,
    textAlign: "left",
  paddingLeft:20
  },

  welcomeMainImage: {
    alignSelf:"center",
    width:400,
    height:230,
    borderRadius:25,
    margin:10

  },
  scrollCategories: {
    flex: 1,
    paddingTop:8
  },
  categoryButton: {
    fontSize: 17,
    padding: 10,
    margin: 10,
    backgroundColor: '#f4ce14',
    borderColor: '#f4ce14',
    borderWidth: 2,
    borderRadius: 15,
    maxHeight:150,
    width:150,
    alignSelf:"center"
    
  },
  categoryLabel: {
    fontSize: 17,
    textAlign:"center",
    fontWeight:"bold",
    verticalAlign:"bottom",
    alignSelf:"center",
    color: '#6b6e70'
  },
  categorySubLabel: {
    fontSize: 9,
    textAlign:"left",
    
    verticalAlign:"bottom",
    alignSelf:"center",
    color:"#6b6e70"
  },
  categoryDisplay: {
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  feedbackScroll: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf:"center",
    paddingBottom:"10%"
  

  },
  feedbackDisplay: {
    flex:1,
    flexDirection:"row",
 
    padding:20
   
  
  },
  feedbackCustomerImage:{ height: 100,
    width: 100,
    borderRadius: 50,
  backgroundColor:"white",
  alignSelf:"flex-start"
  },
  feedbackTitle: {
    fontSize: 17,
    textAlign:"center",
    fontWeight:"bold",
    verticalAlign:"bottom",
    alignSelf:"center",
    padding:5,
    color: '#6b6e70'
   
  },
  feedbackRating: {
    fontSize: 9,
    textAlign:"right",
    fontWeight:"bold",
    alignSelf:"center",
    color: '#6b6e70'
   

  },
  feedbackDescription: {
    fontSize: 13,
    textAlign:"center",
    
    padding:5,
    maxWidth:250,
    color: '#6b6e70'
  },


  button: {
    fontSize: 17,
    padding: 10,
    margin: 10,
    backgroundColor: '#EDEFEE',
    borderColor: '#EDEFEE',
    borderWidth: 2,
    borderRadius: 12,
    maxHeight:50
  },
  buttonText: {
    color: '#6b6e70',
    textAlign: 'center',
    fontSize: 17,
    fontWeight:"bold"
  },

 
  registerTXT: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    fontWeight:"bold"
  },
  underlineTXT:{
    fontStyle:"italic",
    textDecorationLine:"underline",
    textDecorationColor:'#6b6e70',
  },

  //register page 
  registration:{
    flex: 1, 
    justifyContent: "center",

  },
  registrationForm:{
    flex: 0.8, 
    justifyContent: "flex-end",
    
  },
  loginBack: {
    fontSize: 30,
    textAlign:"left",
    paddingTop:40,
   paddingLeft:10,


    color:"#6b6e70",
  },
  // menu Items component
  menu: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:"3%"


  },
  
  menuItemImage: {
    alignSelf:"center",
    width:120,
    height:120,
    borderRadius:25

  },
  menuItemTitle: {
    color: '#F4CE14',
    fontSize: 32,
    paddingBottom:10,

    textAlign: "center"
  },
  NoItems: {
    color: '#6b6e70',
    fontSize: 20,
    paddingBottom:10,
    textAlign: "center",
    verticalAlign:"center"
  },
  menuItemFotter: {
    color: 'white',
    fontSize: 17,
    textAlign: "center",
    marginBottom: 50
  },
  scrollMenuItems: {
    flex: 0.5,
    padding: 40

  },
  menuBack: {
    fontSize: 30,
    textAlign:"left",
   paddingLeft:10,
    color:"#6b6e70",
  },
  innerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"

  },
  itemText: {
    color: 'black',
    fontSize: 20,
    fontWeight:"600",
    paddingHorizontal:10

  },
  itemDesc: {
    color: '#767676',
    fontSize: 15,

  },
  itemPrice: {
    color: '#F4CE14',
    fontSize: 17,
    verticalAlign:"bottom",
    fontWeight:"600",
    paddingHorizontal:10
  },
  itemSeparator: {
    borderBottomWidth: 3,
    borderColor: "#EDEFEE"
  },
  //Feedback Form
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 13,
    borderColor: '#EDEFEE',
    backgroundColor: '#F4CE14',
    borderRadius:8
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 13,
    borderColor: '#EDEFEE',
    borderRadius:8,
    backgroundColor: '#F4CE14',
  },
  infoSection: {
    fontSize: 21,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
    backgroundColor: '#495E57',
  },
  headingSection: {
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
    backgroundColor: '#495E57',
  },
//login page
loginBackground:{flex:1,
justifyContent:"center"


},
monkeyback:{ height: 100,
  width: 100,
  borderRadius: 50,
backgroundColor:"white",
alignSelf:"center"
},
loginMonkey:{
  color: 'white',
  fontSize: 62,
  textAlign: "center",
  marginTop:10
},
loginContainer: {
  flex: 1,
  justifyContent:"center"

},
logininput: {
  height: 40,
  margin: 12,
  width:"85%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  backgroundColor: 'white',
  borderRadius:8,
  alignSelf:"center",
  color:'black',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
 elevation:2,
 color: '#6b6e70'
  

},
welcomeLogin: { 
  color: '#6b6e70',
  fontSize: 35,
  textAlign: "center",
  padding:20
},

loginButton: {
  fontSize: 17,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 12,
  maxHeight:50,
  width:150,
  alignSelf:"center"
  
},
buttonsView:{
  flex:0.3,
  
},
passwordTxt:{
  color:'black',
  fontSize:11,
  fontWeight:"bold",
  width:360,
  textAlign:"center",
  alignSelf:"center"
},
passwordBack: {
  fontSize: 32,
  textAlign:"left",
  paddingTop:"10%",
 paddingLeft:10,


  color:"#6b6e70",
},
backToLogin:{
  color:'#6b6e70',
  fontSize:13,
  fontWeight:"bold",
  width:360,
  textAlign:"center",
  alignSelf:"center",
  paddingTop:"5%"
},

//profile settings
userImage:{ height: 160,
  width: 160,
  borderRadius: 80,
alignSelf:"center",
marginTop:40,
justifyContent:"flex-end"

},
userName: {
  fontSize: 27,
  textAlign:"center",
  fontWeight:"bold",
  verticalAlign:"bottom",
  alignSelf:"center",
  marginTop:20,
  color: '#6b6e70'

},
userEmail: {
  fontSize: 13,
  textAlign:"center",
 
  verticalAlign:"bottom",
  alignSelf:"center",
  marginTop:5,
  color: '#6b6e70'

},

editBackground: {
  fontSize: 14,
  margin:5,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 80,
  maxHeight:"80%",
  width:"30%",

  alignSelf:"flex-end"
  
},

uploadBackground:{
  flex:0.25,
  borderWidth:2,
  borderColor:"#07da63",
  borderRadius:80,
  width:40,
  height:40,
  justifyContent:"center",
  backgroundColor:"#07da63",
  alignSelf:"flex-end",


},
editIcon:{
 fontSize:22,
 color:"black",
 textAlign:"center",
 alignSelf:"center"
},

editProfileButton: {
  fontSize: 17,
  marginTop:20,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 20,
  alignSelf:"center"
  
},
editProfileTxt: {
  fontSize: 19,
  textAlign:"center",
 paddingBottom:5,
 paddingLeft:30,
 paddingRight:30,
  verticalAlign:"bottom",
  alignSelf:"center",
  paddingTop:5,
  color: '#6b6e70'

},
profilePageButtons: {
 alignContent:"center",
  backgroundColor: 'transparent',
  borderColor: '#6b6e70',
  borderWidth: 2,
  borderRadius: 30,
  alignSelf:"center",
  width:"85%",
  justifyContent:"space-evenly",
  flexDirection:"row",
  marginTop:15

  
},
profileButtonTxt: {
  fontSize: 19,
  textAlign:"left",
 paddingBottom:10,
  width:250,
  color:"black",
  paddingTop:10,

},
profileIcons: {
  fontSize: 22,
  textAlign:"left",
  paddingBottom:10,
 paddingLeft:5,
 paddingRight:10,
  paddingTop:10,
  color:"#6b6e70",
},
arrowRight: {
  fontSize: 22,
  textAlign:"right",
  paddingBottom:10,
 paddingRight:10,
  paddingTop:10,
  color:"#6b6e70",
},

//profile update
uploadOptions:{
  flex:1,
  flexDirection:'row',
  padding:15
},
updateUserButton: {
  fontSize: 14,
  margin:5,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 12,
  maxHeight:60,
  width:140,
  alignSelf:"center"
  
},

updateUserButtonDisabled: {
  fontSize: 14,
  margin:5,
  padding: 10,
  backgroundColor: '#6b6e70',
  borderColor: '#6b6e70',
  borderWidth: 2,
  borderRadius: 12,
  maxHeight:60,
  width:140,
  alignSelf:"center"
  
},
uploadimageBTN: {
  fontSize: 14,
  margin:5,
  padding: 10,
  backgroundColor: '#006700',
  borderColor: '#006700',
  borderWidth: 2,
  borderRadius: 80,
  maxHeight:"80%",
  width:"30%",

  alignSelf:"flex-end"
  
},

addrFields: {
  height: 40,
  margin: 12,
  width:"39%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,

  backgroundColor: 'transparent',
  borderRadius:8,
  alignSelf:"center",
  color:'black'
  

},

// menu item modal
scrollModal: {
  flex: 1,
  backgroundColor: 'white',
  paddingTop:"5%"

},
dishDetModal: {
  color: 'black',
  fontSize: 18,
  textAlign: "left",
  paddingVertical:10,
 
},
dishPriceModal: {
  color: 'black',
  fontSize: 18,
  textAlign: "left",
  paddingVertical:10,
  fontWeight:"bold"
 
},
modalImage: {
  alignSelf:"center",
  width:400,
  height:280,
  borderRadius:25,
  margin:10

},
menuDetModal: {
  flex: 1,
  paddingHorizontal:15,
  justifyContent:"center"
},
reviewLabelModal: {
  color: '#6b6e70',
  fontSize: 16,
  textAlign: "left",
  
},
itemModal:{
    flex: 1,
    flexDirection:"row",
    

},
orderQuantityModal:{
  flex: 0.2,
  flexDirection:"row",
  justifyContent:"space-between",
  paddingHorizontal:10


},
special:{
  flex: 1,
  flexDirection:"row",
  marginTop:10,
  marginBottom:5,
  backgroundColor:"#EDEFEE",
  marginHorizontal:10,
},
specialText: {
  color: 'black',
  fontSize: 18,
  textAlign: "left",
  paddingVertical:10,
  fontWeight:"bold",
  paddingHorizontal:15,

},
numericText:{ 
  color:'black' ,
fontSize:20,


},

numericInput:{
  borderColor: "#EDEFEE",
  borderWidth: 2, 
  minWidth: "20%" ,
  minHeight:"32%",
  maxHeight:"35%",
  borderRadius: 12,
  paddingHorizontal:15,
  alignItems:"center",
  flex:0.2,
  flexDirection:"column",
  justifyContent:"center"
},
numericInput2:{
  borderColor: "#EDEFEE",
  borderWidth: 2, 
  borderRadius: 12,
  paddingHorizontal:15,
  alignItems:"center",
  minWidth:"45%", 
  flex:0.5,
  flexDirection:"column",
  justifyContent:"center"
},


addToCart: {
  
  fontSize: 17,
  paddingLeft: 10,
  paddingRight:10,
  paddingVertical: 12,
  flex:1,
  flexDirection:"row",
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 12,
  maxHeight:70,
  alignSelf:"center",
  justifyContent:"space-between"
  
},
addingItem:{
  alignSelf:"center",
  paddingRight:10,
  flexDirection:"row"

},
// shopping cart
shoppingList: {
  flex:0.9,
  justifyContent:"center"

},
shoppingSummary: {
  flex:1,
  justifyContent:"center",
  paddingBottom:"2%",
  

},
shoppingHeader:{
  backgroundColor:"#f4ce14",
 
  flexDirection:"row",
  justifyContent:"center"
},
shoppingBack: {
  fontSize: 30,
  textAlign:"left",
 


  color:"#6b6e70",
},
shoppingContainer: {
width:"85%",
  paddingVertical: 10,
  flex: 1,
  flexDirection: "row",
  alignSelf:"center",
  backgroundColor:"white"

},
  
shoppingItemImage: {
  alignSelf:"center",
  width:80,
  height:80,
  borderRadius:25

},
removeItem: {
  fontSize: 25,
  textAlign:"right",
 paddingLeft:10,
  color:"#6b6e70",
},
promoContainer:{
  width:"85%",
  flexDirection:"row",
  marginTop:'4%',
  verticalAlign:"center",
  alignSelf:"center",

},
promoCode: {
  maxHeight: 60,
 
 width:"80%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  backgroundColor: 'white',
  borderRadius:8,
  alignSelf:"center",
  color:'black',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
 elevation:2
  

},
applyButton: {
  fontSize: 14,
  margin:5,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 12,
  maxHeight:60,
  maxWidth:"20%",
  alignSelf:"center",
  
},
pricingContainer:{
  width:"90%",
 backgroundColor:"#EDEFEE",   
  marginVertical:'2%',
  verticalAlign:"middle",
  alignSelf:"center",
  padding:15,
  borderRadius:20 ,
  position: "relative" 
},
pricingText: {
  color: '#6b6e70',
  textAlign: 'center',
  fontSize: 17,
  fontWeight:"bold",
 
  paddingVertical:5
},

pricingTotal: {
  color: 'black',
  textAlign: 'center',
  fontSize: 17,
  fontWeight:"bold",

  paddingVertical:10

},
pricingSeparator: {
  borderBottomWidth: 1,
  borderColor: "black"
},
orderButton: {
  fontSize: 18,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 20,
  maxHeight:50,
  width:250,
  alignSelf:"center",
  verticalAlign:"bottom"

  
},
reOrder: {
  fontSize: 18,
  padding: 10,
  backgroundColor: '#f4ce14',
  borderColor: '#f4ce14',
  borderWidth: 2,
  borderRadius: 20,
  maxHeight:60,
  width:140,
  alignSelf:"center",
  verticalAlign:"bottom"
  
},
shoppingPage: {
  flex: 1,
  backgroundColor: 'white',
  paddingBottom:"5%",
  paddingTop:"8%",
  justifyContent:"space-between"

},
orderContainer:{
  width:"85%",
  marginVertical:'1%',
  verticalAlign:"center",
  alignSelf:"center",
  position: "relative" 

},
orderLabel:{
  color: '#F4CE14',
  fontSize: 25,
  alignSelf:"flex-start",
  textAlign: "left"
},
LocationField: {
  maxHeight: 50,
  width:"100%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  backgroundColor: 'white',
  borderRadius:8,
  alignSelf:"center",
  color:'black',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
 elevation:2
  

},
orderField: {
  maxHeight: 50,
  width:"80%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  backgroundColor: 'transparent',
  borderRadius:8,
  alignSelf:"center",
  color:'black'
  

},
//PaymentPage
paymentOptionsPage: {
  flex: 1,
  backgroundColor: 'white',
  paddingBottom:"5%",
  paddingTop:"5%",
  justifyContent:"space-between"

},
paymentContainer: {
  width:"85%",
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    alignSelf:"center",
    justifyContent:"space-around"
  
  },
paymentTitle: {
  color: '#F4CE14',
  fontSize: 30,
  
  paddingTop:"10%",

  textAlign: "center"
},
PaymentBack: {
  fontSize: 30,
  textAlign:"left",
  paddingTop:"10%",
  paddingLeft:"2%",



  color:"#6b6e70",
},
cardDateInput: {
  height: 40,
  margin: "2.5%",
  width:"45%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  
  backgroundColor: 'transparent',
  borderRadius:8,
  alignSelf:"center",
  color:'black'
  
},
CVVInput: {
  height: 40,
  margin: "2.5%",
  width:"35%",
  borderWidth: 2,
  borderColor:"#6b6e70",
  padding: 10,
  fontSize: 13,
  
  backgroundColor: 'transparent',
  borderRadius:8,
  alignSelf:"center",
  color:'black'
  
},
cardLogo: {
  alignSelf:"center",
  width:300,
  height:50,
  borderRadius:25,

},
cardNumber: {
  color: 'black',
  fontSize: 16,
  fontWeight:"600",
  paddingHorizontal:10

},

//dropdown styling 
dropdown: {
  height: 40,
  width:"100%",
  borderWidth: 2,
  backgroundColor: 'white',
  borderColor:"#6b6e70",
  borderRadius: 8,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
 elevation:2
},
icon: {
  marginRight: 5,
},
item: {
  
  flexDirection: 'row',
  justifyContent:"space-around",
  alignItems: 'center',
},
textItem: {
  flex: 1,
  fontSize: 13,

},
placeholderStyle: {
  fontSize: 13,

 color: '#6b6e70'
 
},
selectedTextStyle: {
  fontSize: 13,
  color: '#6b6e70'
  

},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
//order history
orderTitle: {
  color: '#6b6e70',
  textAlign: 'center',
  fontSize: 18,
  fontWeight:"bold",
 
  paddingVertical:5
},
noOrders: {
  color: '#6b6e70',
  fontSize: 20,
  paddingBottom:10,
  textAlign: "center",
  alignSelf:"center"
},
orderDate: {
  color: '#6b6e70',
  textAlign: 'left',
  fontSize: 18,
  fontWeight:"bold",

  paddingHorizontal:20,
  paddingTop:10
},

//passwrod recovery

centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

},
modalView: {

  backgroundColor: 'white',
  borderRadius: 20,
width:"80%",
height:"35%",
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 10,
    height: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},



});
