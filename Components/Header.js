import * as react from 'react';
import { View, Text,Image } from 'react-native';
import styles from './Style'
import logo from '../assets/littleLogo.png'
export default function Header(){
    return <>
<Image style={styles.headerLogo} source={logo} resizeMode="contain"></Image>
        <Text style={styles.headerTitle}>Little Lemon</Text>
   </>
}