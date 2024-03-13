import * as react from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './Style'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CategoryButtons(props) {
    // console.log(props)
    return (
        <Pressable style={styles.categoryButton} onPress={()=> props.setMenuCategories()} >
            <View style={styles.categoryDisplay}>
                {props.desc === 'Drinks' && (<FontAwesome5 style={styles.menuIcons} name="wine-bottle" />
                )
                }
                {props.desc === 'Entrees' && (<MaterialCommunityIcons name="food-croissant" style={styles.menuIcons} />

                )
                }
                {props.desc === 'Mains' && (<MaterialCommunityIcons name="food-steak" style={styles.menuIcons} />

                )
                }
                {props.desc === 'Desserts' && (<Ionicons name="ice-cream-outline" style={styles.menuIcons} />

                )
                }
                <View>
                <Text style={styles.categoryLabel}>{props.desc}</Text>
                <Text style={styles.categorySubLabel}>{props.no} items</Text>
                </View>
               
            </View>

        </Pressable>
    )
}