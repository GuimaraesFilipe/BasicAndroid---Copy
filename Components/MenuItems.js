import * as react from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native'
import styles from './Style'


export default function MenuItems (){

    const menuItemsToDisplay = [
        { name: 'Hummus', price: '$5.00', id: '1A' },
        { name: 'Moutabal', price: '$5.00', id: '2B' },
        { name: 'Falafel', price: '$7.50', id: '3C' },
        { name: 'Marinated Olives', price: '$5.00', id: '4D' },
        { name: 'Kofta', price: '$5.00', id: '5E' },
        { name: 'Eggplant Salad', price: '$8.50', id: '6F' },
        { name: 'Lentil Burger', price: '$10.00', id: '7G' },
        { name: 'Smoked Salmon', price: '$14.00', id: '8H' },
        { name: 'Kofta Burger', price: '$11.00', id: '9I' },
        { name: 'Turkish Kebab', price: '$15.50', id: '10J' },
        { name: 'Fries', price: '$3.00', id: '11K' },
        { name: 'Buttered Rice', price: '$3.00', id: '12L' },
        { name: 'Bread Sticks', price: '$3.00', id: '13M' },
        { name: 'Pita Pocket', price: '$3.00', id: '14N' },
        { name: 'Lentil Soup', price: '$3.75', id: '15O' },
        { name: 'Greek Salad', price: '$6.00', id: '16Q' },
        { name: 'Rice Pilaf', price: '$4.00', id: '17R' },
        { name: 'Baklava', price: '$3.00', id: '18S' },
        { name: 'Tartufo', price: '$3.00', id: '19T' },
        { name: 'Tiramisu', price: '$5.00', id: '20U' },
        { name: 'Panna Cotta', price: '$5.00', id: '21V' },
      ];
      const header =() => <Text style={styles.menuItemTitle}> Menu Items </Text>
      const footer =() => <Text style={styles.menuItemFotter}> End of the list </Text>

    const itemSeparator =() => <View style={styles.itemSeparator} ></View>
      const Item =({name,price})=>{
        return(
            <View style={styles.innerContainer}>
                <Text style={styles.itemText}>
                {name}
                </Text>
                <Text style={styles.itemText}>
                {price}
                </Text>
            </View>
        )
      }
      const renderItem =({item})=>{
        return(
            <Item name={item.name} price={item.price}></Item>
        )
      }
    return (
        <View style={styles.menu}>
            
            <FlatList  ListHeaderComponent={header} ListFooterComponent={footer} ItemSeparatorComponent={itemSeparator} data={menuItemsToDisplay} keyExtractor={item =>item.id} renderItem={renderItem} indicatorStyle='white' style={styles.scrollMenuItems}/>
            
        </View>
    )}
