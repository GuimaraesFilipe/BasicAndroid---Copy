import * as react from 'react';
import { View, Pressable, Text, ScrollView, TextInput, KeyboardAvoidingView, Image, ImageBackground } from 'react-native'
import styles from '../Style'
import { auth } from '../../firebase/config'
import { signOut } from "firebase/auth";
import { useUser } from "../../provider/provider.js";
import { useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Feather, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import ChangePassword from './changePassword';
import ProfileUpdate from './profileUpdate';
import defaultUser from '../../assets/User_Icon.png'


export default function ProfileSettings({ navigation }) {
    const userId = useUser();

    const [user, setUser] = react.useState(useUser().user)
    const [updateUser, setupdateUser] = react.useState(false)
    const [updatePassword, setupdatePassword] = react.useState(false)

    const [profileImage, setProfileImage] = react.useState({ uri: user.profileImage })
   

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('login')
        //    console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    const fetchuser = async () => {
        // console.log(userId.uid)
        const docSnap = await getDoc(doc(db, "users", userId.uid));
        setUser(docSnap.data())
        setProfileImage({ uri: docSnap.data().profileImage })


    }


    const userUpdated = () => {
        fetchuser();
        setupdateUser(!updateUser);
    }



    return (
        <>
            {updatePassword && (<ChangePassword uid={userId.uid} user={user} backToSettings={() => setupdatePassword(!updatePassword)} ></ChangePassword>)}
            {updateUser && (<ProfileUpdate uid={userId.uid} user={user} updated={() => userUpdated()} backToSettings={() => setupdateUser(!updateUser)} ></ProfileUpdate>)}
            {!updateUser && !updatePassword && (<View style={styles.welcome}  >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {profileImage.uri ? 
                    (<ImageBackground
                        source={{ uri: `${profileImage.uri}` }}
                       
                        style={styles.userImage}
                        imageStyle={{ borderRadius: 80 }} />) :
                        
                        (<ImageBackground style={styles.userImage} source={defaultUser} imageStyle={{ borderRadius: 80 }}>

                        </ImageBackground>)}




                    <Text style={styles.userName}>{user.fullname}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Pressable style={styles.editProfileButton} onPress={() => setupdateUser(!updateUser)}>
                        <Text style={styles.editProfileTxt}>
                            Edit profile info
                        </Text>
                    </Pressable>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Pressable style={styles.profilePageButtons} onPress={() => setupdatePassword(!updatePassword)} >
                        <MaterialIcons name="lock" style={styles.profileIcons} />
                        <Text style={styles.profileButtonTxt}  >
                            Change Password
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" style={styles.arrowRight} />
                    </Pressable>
                    <Pressable style={styles.profilePageButtons} onPress={() => navigation.navigate('PaymentSettings')} >
                        <MaterialIcons name="privacy-tip" style={styles.profileIcons} />
                        <Text style={styles.profileButtonTxt}  >
                            Payment Options
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" style={styles.arrowRight} />
                    </Pressable>
                    <Pressable style={styles.profilePageButtons} onPress={() => navigation.navigate('Orders')} >
                        <FontAwesome name="history" style={styles.profileIcons} />
                        <Text style={styles.profileButtonTxt}  >
                            Order history
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" style={styles.arrowRight} />
                    </Pressable>
                    <Pressable style={styles.profilePageButtons} >
                        <Feather name="help-circle" style={styles.profileIcons} />
                        <Text style={styles.profileButtonTxt}  >
                            Help & Support
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" style={styles.arrowRight} />
                    </Pressable>
                    <Pressable style={styles.profilePageButtons} onPress={() => handleLogout()}>
                        <AntDesign name="logout" style={styles.profileIcons} />
                        <Text style={styles.profileButtonTxt}  >
                            Log Out
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" style={styles.arrowRight} />

                    </Pressable>
                </View>


            </View>
            )}
        </>




    )

}
