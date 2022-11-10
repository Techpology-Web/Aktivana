import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import {t} from "react-native-tailwindcss"
import TextInputField from '../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

// Animations
import * as Animatable from 'react-native-animatable';

// Components
import Button from '../Components/Button';
import InputField from '../Components/InputField';
import MainView from '../Components/MainView';
import SlicedInputField from '../Components/SlicedInputField';

export default function VerifyForgotPassword(props) {

	const [code, setCode] = useState("")

	const verify = () =>
	{
		alert(code)
		axios.post("account/forgot/verify/", {
			"email": global.recoverEmail,
			"code" : code
		})
		.then(resp => {
			if(resp.status != 403 && resp.status != 409)
			{
				props.navigation.navigate("UpdatePassword");
			}
		})
		.catch(error => {
			alert(error.response.data)
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

				<SlicedInputField value={(e)=>{setCode(e)}} />
				<Text style={[t.textRight,t.textRed700,t.fontLight,t.textSm]}></Text>

				<Button onPress={()=>{verify();}} title="Verifera" />

				<View style={[t.wFull, t.flexRow, t.justifyEnd, t.mT2]}>
					<Text style={[t.textWhite]}>Har redan ett konto? </Text>
					<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}}>
						<Text style={[t.textBlue400]}>Logga in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Animatable.View>
	</MainView>
	)
}