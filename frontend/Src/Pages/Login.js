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

    if(typeof(global.session) != "undefined" && global.session != "undefined"){
        if(global.session["type"]===1) props.navigation.navigate("AdminHome")
        else if(global.session["type"]===2) props.navigation.navigate("Scan")
		    else props.navigation.navigate("EmployeeHome")
    }

    function login(){
        axios.post("account/login/",{"email":email,"password":password})
        .then(r=>{
            global.session = r.data;
            // if type = 1 the acount is a admin acount
            // then we send to admin home
            if(r.data["type"]===1) props.navigation.navigate("AdminHome")
          	else if(global.session["type"]===2) props.navigation.navigate("PartnerHome")
            else props.navigation.navigate("EmployeeHome")

		}).catch(error=>{
			setError(error.response.data)
		})
	}

	return (
	<MainView>
		<Animatable.View animation="fadeInDown">
			<View style={[t.mX8]} >
				<View style={[t.wFull,t.itemsCenter]} >
					<Image source={require('../Images/logo.png')} style={[{
						width: 321*0.9,
						height: 113*0.9,
						resizeMode: 'contain'
					}]} />
				</View>

				<TextInputField							onChangeText={setEmail} placeholder="Din E-mail"                  icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} />
				<TextInputField onSubmitEditing={login} onChangeText={setPassword} placeholder="Password" password={true} icon={<MaterialCommunityIcons name="key-outline"   size={24} color="#00000030" />} />

				<View style={[t.mB5,t.flex,t.flexRow, t.selfEnd]}>
					<Text style={[t.textWhite,t.fontLight,t.textSm,]}> Har inte ett konto? </Text>
					<TouchableOpacity onPress={()=>{props.navigation.navigate("Signup")}} >
						<Text style={[t.textWhite,t.fontLight,t.textSm,t.textGreen300]}> Skapa Konto </Text>
					</TouchableOpacity>
				</View>
				<Text style={[t.textRight,t.textRed700,t.fontLight,t.textSm]}>{error}</Text>

				<Button onPress={login} title="Logga in" />
				<View style={[t.selfEnd]}>
					<TouchableOpacity onPress={()=>{props.navigation.navigate("ForgotPassword")}} >
						<Text style={[t.textWhite,t.fontLight,t.textSm,t.textGreen300]}> Glömt lösenord </Text>
					</TouchableOpacity>
				</View>
			</View>
		</Animatable.View>
	</MainView>
	)
}
