import * as react from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import styles from './Style'
import { useEffect } from 'react';

import CategoryButtons from './CategoyButtons.js';
import CustomerFeedback from './CustomerFeedback';
import { useMenu } from "../provider/menuProvider";
import ItemPage from './item page/itemPage';
import Person1 from '../assets/person1.png'
import Person2 from '../assets/person2.png'
import Person3 from '../assets/person3.png'




export default function WelcomePage({ navigation }) {
  const [modalVisible, setModalVisible] = react.useState(false);
  const foodCategories = useMenu().foodCategories;
  const mostPopular = useMenu().Popular;
  const randomPopular = useMenu().randomPop;
 // console.log( mostPopular.image)
 
  const testimonials = [
    {
      image: Person1,
      name: "John Doe",
      rating: "5.0",
      testimonial: "We had a fantastic night. The venue was spectacular, food amazing"
    },
    {
      image: Person2,
      name: "Mary Jane",
      rating: "4.7",
      testimonial: "Thank you very much for all your hard work, the outstanding meals and fantastic service."
    },
    {
      image: Person3,
      name: "Tom McGill",
      rating: "4.9",
      testimonial: "Thank you so much for organising such a seamless catering experience! "
    }
  ]
  return (

    <ScrollView keyboardShouldPersistTaps="handled" indicatorStyle={"grey"} style={styles.scrollWelcome}>
      {modalVisible && (<ItemPage cartPage={() => navigation.navigate('MenuCat')} image={mostPopular.image} name={mostPopular.name} rating={mostPopular.rating} description={mostPopular.description} price={mostPopular.price} reviews={mostPopular.reviews} showItem={modalVisible} showHide={() => setModalVisible(!modalVisible)}></ItemPage>)}

    
       <View style={styles.menuOptions}>
        <Text style={styles.menuOptionNames} >Dishes</Text>
        <Pressable onPress={() => navigation.navigate('MenuCat')} ><Text style={styles.viewmore}>View more</Text></Pressable>
      </View>
        <Pressable onPress={() => setModalVisible(!modalVisible)} >
          {/* <Image style={styles.welcomeMainImage} source={{ uri: mostPopular.image }} resizeMode="cover"></Image> */}
          <Image
          source={{ uri: `${ mostPopular.image}` }}
       
          imageStyle={{ borderRadius: 20 }}  
          resizeMode="cover"
          style={styles.welcomeMainImage} />
        </Pressable>
        <View style={styles.menuDet}>
          <Text style={styles.menuDetNames} >{mostPopular.name}</Text>
          <Text style={styles.reviewLabel}>⭐⭐⭐⭐⭐ {mostPopular.rating} ({mostPopular.reviews})</Text>

        </View>
        <View style={styles.menuOptions}>
          <Text style={styles.menuOptionNames} >Food Categories</Text>

        </View>
        <ScrollView keyboardShouldPersistTaps="handled" horizontal={true} style={styles.scrollCategories}>
          {foodCategories.map((item, index) => {
            if (item.title !== 'Popular')
              return <CategoryButtons key={index} desc={item.title} no={item.count} setMenuCategories={() => navigation.navigate('MenuCat', { category: item.title })}></CategoryButtons>
          })}

        </ScrollView>

        <View style={styles.menuOptions}>
          <Text style={styles.menuOptionNames} >Popular Items</Text>
          <Pressable onPress={() => navigation.navigate('MenuCat', { category: 'Popular' })} ><Text style={styles.viewmore}>View more</Text></Pressable>
        </View>
        {/* <Image style={styles.welcomeMainImage} source={{ uri: randomPopular.image }} resizeMode="cover"></Image> */}

        <Image
          source={{ uri: `${ randomPopular.image}` }}
         
          imageStyle={{ borderRadius: 20 }}  
          resizeMode="cover"
          style={styles.welcomeMainImage} />
        <View style={styles.menuOptions}>
          <Text style={styles.menuOptionNames} >Customer Feedback</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" horizontal={true} style={styles.feedbackScroll}>
          {testimonials.map((item, index) => {
            return <CustomerFeedback key={index} name={item.name} rating={item.rating} image={item.image} testimonial={item.testimonial}></CustomerFeedback>
          })}

        </ScrollView>

    


    </ScrollView>

  )
}