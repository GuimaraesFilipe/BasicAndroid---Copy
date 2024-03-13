import * as react from 'react';
import { View, Text,Image } from 'react-native';
import styles from './Style'
import logo from '../assets/littleLogo.png'
export default function HeaderTab(){
    return <View style={styles.header}>
<Image style={styles.headerLogoTab} source={logo} resizeMode="contain"></Image>
        <Text style={styles.headerTitle}>Little Lemon</Text>
   </View>
}