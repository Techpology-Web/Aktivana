import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import Button from '../Components/Button';
import {t} from "react-native-tailwindcss"
import TextInputField from '../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '../Components/InputField';
import MainView from '../Components/MainView';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function Login(props) {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [acount, setAcount] = useState(null);

    function login(){
        axios.post("acount/login",{"email":email,"password":password})
        .then(r=>{
            global.session = r.data;
            props.navigation.navigate("Home")
        }).catch(error=>{
            alert(error)
        })
    }

    return (
    <MainView>
        <Animatable.View animation="fadeInDown">

        <View style={[t.mX8]} >
            <View style={[t.wFull,t.itemsCenter,t.mB5]} >
            <Image source={require('../Images/logo.png')} style={[{
                width:253,
                height:60,
            }]} />
            </View>

            <TextInputField onChangeText={setEmail} placeholder="Din E-mail"               icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} ></TextInputField>
            <TextInputField onChangeText={setPassword} placeholder="Password" password={true} icon={<MaterialCommunityIcons name="key-outline"   size={24} color="#00000030" />} ></TextInputField>

            <View style={[t.mB5,t.flex,t.flexRowReverse]} >
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Signup")}} >
                <Text style={[t.textWhite,t.fontLight,t.textSm,t.textGreen300]}> Skapa Konto </Text>
            </TouchableOpacity>
            <Text style={[t.textWhite,t.fontLight,t.textSm,]}> Har inte ett konto? </Text>
            </View>

            <Button onPress={login} title="Logga in" ></Button>
            </View>
        </Animatable.View>

    </MainView>
    )
}
