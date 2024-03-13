import * as react from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from '../Style'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { PaymentIcon } from 'react-native-payment-icons'
import { useEffect } from 'react';
export default function CardTypes(props) {


const re = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        dankort: /^(5019)\d+$/,
        interpayment: /^(636)\d+$/,
        unionpay: /^(62|88)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    }
const returnIcon=()=>{
    for(var key in re) {
        if(re[key].test(props.number)) {
            return key
        }else{
            return 'generic'
        }
    }
}
const cardType=    returnIcon();

    return (
            <View style={styles.categoryDisplay}>
                
                <View>
              {cardType==='visa' &&(<PaymentIcon type='visa' width={50}/>)}
              {cardType==='mastercard' &&(<PaymentIcon type='mastercard' width={50}/>)}
              {cardType==='amex' &&(<PaymentIcon type='amex' width={50}/>)}

              {cardType==='generic' &&(<PaymentIcon type='generic' width={60}/>)}

                </View>
               
            </View>
    )
}