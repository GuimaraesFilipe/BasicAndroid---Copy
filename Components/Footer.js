import * as react from 'react';
import { View, Text } from 'react-native'
import styles from './Style'

export default function Footer (){
    return (
        <View style={styles.footer}>
        <Text style={styles.footerText}>All rights reserved by Little Lemon, 2022</Text>
    </View>
    )
}