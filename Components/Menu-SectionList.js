import * as react from 'react';
import { View, Text, ScrollView, FlatList, SectionList, Image, Pressable } from 'react-native'
import styles from './Style';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config'
import { doc, getDoc, collection, query, where, getDocs, listCollections } from "firebase/firestore";
import { db } from '../firebase/config';
import { useMenu } from "../provider/menuProvider";
import { Ionicons } from '@expo/vector-icons';
import ItemPage from './item page/itemPage';
export default function MenuItemsSection(props) {
  const menuData = useMenu().menu;
  const [modalVisible, setModalVisible] = react.useState(false);
  const [modalItem, setModalItem] = react.useState();
  const subSec = []
  const category = props;
  let displayItems;


if (category.route.params !== undefined){
  if(category.route.params.category==='Popular'){
    displayItems=useMenu().setPopular()
    
  }
  else{
    displayItems = menuData.find(list => list.section === category.route.params.category).subSections
    
  }
}


  menuData.map(element => {
    element.subSections.forEach
      (element => {
        // console.log('image?',element)
        if (element.title !== 'Popular Dishes') {
          subSec.push(element)
        }
        else {

        }

      }
      )
  });
  const [menu, setMenu] = useState(category.route.params !== undefined ? displayItems : subSec)

  const setModal = (item) => {
    // console.log(item)
    setModalVisible(!modalVisible);
    setModalItem(item)


  }
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.menuItemTitle}>{title} </Text>
  );

  const itemSeparator = () => <View style={styles.itemSeparator} ></View>
  class Item extends react.PureComponent {
    render() {
      return (
        <View style={styles.innerContainer}>

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={styles.itemText}>
              {this.props.name}
            </Text>
            <Text style={styles.itemDesc}>
              {this.props.description}
            </Text>
            <Text style={styles.itemPrice}>
              {this.props.price}
            </Text>
          </View>
          <Image
          source={this.props.image ?{ uri: `${this.props.image}` }: { uri: 'https://th.bing.com/th/id/OIP.0dDro_bGcycAl4f7UoQulgHaHZ?pid=ImgDet&rs=1' } }
         
          imageStyle={{ borderRadius: 20 }}    

          resizeMode="cover"
                    style={styles.menuItemImage} />

          {/* <Image style={styles.menuItemImage} source={this.props.image ? { uri: this.props.image } : { uri: 'https://th.bing.com/th/id/OIP.0dDro_bGcycAl4f7UoQulgHaHZ?pid=ImgDet&rs=1' }} resizeMode="center"></Image> */}
        </View>
      )
    }
  }
  const renderItem = ({ item }) => {

    return (<>
      <Pressable onPress={() => setModal(item)} >
        <Item name={item.name} description={item.description} price={item.price} image={item.image}></Item>
      </Pressable>
    </>
    )
  }
  return (
    <View style={styles.menu}>
      <Pressable onPress={() => props.navigation.navigate('WelcomePage')}><Ionicons name="chevron-back" style={styles.menuBack} /></Pressable>
      <SectionList  stickySectionHeadersEnabled={false} keyExtractor={(item, index) => item + index} sections={menu} renderItem={renderItem} renderSectionHeader={renderSectionHeader} ItemSeparatorComponent={itemSeparator} ></SectionList>
      {modalVisible && (<ItemPage cartPage={() => props.navigation.navigate('MenuCat')} image={modalItem.image} name={modalItem.name} rating={modalItem.rating} description={modalItem.description} price={modalItem.price} reviews={modalItem.reviews} showItem={modalVisible} showHide={() => setModalVisible(!modalVisible)}></ItemPage>)}

    </View>
  )
}
