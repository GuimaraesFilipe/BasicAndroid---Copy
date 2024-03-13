import * as react from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './Style'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CustomerFeedback(props) {

    return (
        <View style={styles.feedbackDisplay} >
          <Image style={styles.feedbackCustomerImage} source={props.image} resizeMode="cover"></Image>
          <View >
          <Text style={styles.feedbackTitle}>{props.name} <Text style={styles.feedbackRating}> {props.rating} ⭐</Text></Text>
          

          <Text style={styles.feedbackDescription}> {props.testimonial}</Text>
          </View>
          
          </View>
    )
}