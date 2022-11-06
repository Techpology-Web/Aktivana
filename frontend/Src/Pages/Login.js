import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [account, setAcount] = useState(null);
    const [error, setError] = useState("");

	if(global.session!="undefined"){
        props.navigation.navigate("Home");
	}
	

    function login(){
        axios.post("account/login/",{"email":email,"password":password})
        .then(r=>{
            setError("")
            global.session = r.data;
            props.navigation.navigate("Home")
        }).catch(error=>{
            setError(error.response.data)
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
            <Text style={[t.textRight,t.textRed700,t.fontLight,t.textSm]}>{error}</Text>

            <Button onPress={login} title="Logga in" ></Button>
            </View>
        </Animatable.View>

    </MainView>
    )
}
