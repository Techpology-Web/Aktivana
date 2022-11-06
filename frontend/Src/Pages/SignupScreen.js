import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import React, {useState, useEffect} from 'react'
import {t} from "react-native-tailwindcss"
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios';

// Animations
import * as Animatable from 'react-native-animatable';

// Template
import MainView from '../Components/MainView';

// Components
import InputField from '../Components/InputField';
import Button from '../Components/Button';

export default function SignupScreen(props) {

	const [viewIndex, setViewIndex] = useState(0);
	const [errorCode, setErrorCode] = useState("");

	const [inviteCode, setInviteCode] = useState("");
	
	const [firstName , setFirstName]  = useState("");
	const [lastName  , setLastName]   = useState("");
	
	const [email , setEmail] = useState("");
	const [passw , setPassw] = useState("");

	// whtweuxct
	const viewEntryCode = () =>
	{
		const verifyCode = () =>
		{
			axios.post("company/verify/", {code:inviteCode})
			.then(resp => {
				setErrorCode("");
				if(resp.status != 403 && resp.status != 500)
					setViewIndex(viewIndex + 1)
			})
			.catch(error => {setErrorCode("Invite code not found.");})
		}

		if(viewIndex == 0)
		{
			return(
				<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
					<Text style={[t.textWhite, t.textXl]}>Please provide your companies invite code</Text>
					<InputField val={(e)=>{setInviteCode(e)}} placeholder="inbjudnings-kod" icon={<MaterialCommunityIcons name="wallet-giftcard" size={24} color="#00000050" />} />

					<View style={[t.wFull, t.flexRow, t.justifyEnd, t.pR12, t.mT2]}>
						<Text style={[t.textWhite]}>Har redan ett konto? </Text>
						<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}}>
							<Text style={[t.textBlue400]}>Har redan ett konto?</Text>
						</TouchableOpacity>
					</View>

					<View style={[t.wFull,t.mR32, t.mT2]}>
						<Text style={[t.textRed400, t.selfEnd, t.textMd ]}>{errorCode}</Text>
					</View>

					<View style={[t.selfEnd, t.mX12, t.mT4]}>
						<TouchableOpacity onPress={()=>{verifyCode()}}>
							<MaterialIcons name="keyboard-arrow-right" size={60} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			)
		}
	}

	const viewPersonalInfo = () =>
	{
		const next = ()=>
		{
			setErrorCode("");
			if(firstName == "")
				setErrorCode("First name can not be empty");
			else if(lastName == "")
				setErrorCode("Last name can not be empty");
			else
				setViewIndex(viewIndex + 1);
		}

		if(viewIndex == 1)
		{
			return(
				<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
					<InputField val={(e)=>{setFirstName(e)}} placeholder="first-name" icon={<MaterialCommunityIcons name="wallet-giftcard" size={24} color="#00000050" />} />
					<InputField val={(e)=>{setLastName(e)}} placeholder="last-name" icon={<MaterialCommunityIcons name="wallet-giftcard" size={24} color="#00000050" />} />

					<View style={[t.wFull, t.flexRow, t.justifyEnd, t.pR12, t.mT2]}>
						<Text style={[t.textWhite]}>Har redan ett konto? </Text>
						<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}}>
							<Text style={[t.textBlue400]}>Har redan ett konto?</Text>
						</TouchableOpacity>
					</View>

					<View style={[t.wFull,t.mR32, t.mT2]}>
						<Text style={[t.textRed400, t.selfEnd, t.textMd ]}>{errorCode}</Text>
					</View>

					<View style={[t.justifyBetween, t.flexRow, t.wFull, t.pX12, t.mT4]}>
						<TouchableOpacity onPress={()=>{setViewIndex(viewIndex - 1);setErrorCode("");}}>
							<MaterialIcons name="keyboard-arrow-left" size={60} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{next()}}>
							<MaterialIcons name="keyboard-arrow-right" size={60} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			)
		}
	}

	const viewAccountInfo = () =>
	{
		const done = () =>
		{
			axios.post("account/add/", {
				signupCode: inviteCode,
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: passw
			}).then(resp=>{
				props.navigation.navigate("Login")
			}).catch(error=>{
				setErrorCode(error.response.data)
			})
		}

		if(viewIndex == 2)
		{
			return(
				<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
					<InputField val={(e)=>{setEmail(e)}} placeholder="e-mail" icon={<MaterialCommunityIcons name="wallet-giftcard" size={24} color="#00000050" />} />
					<InputField val={(e)=>{setPassw(e)}} placeholder="password" icon={<MaterialCommunityIcons name="wallet-giftcard" size={24} color="#00000050" />} />

					<View style={[t.wFull, t.flexRow, t.justifyEnd, t.pR12, t.mT2]}>
						<Text style={[t.textWhite]}>Har redan ett konto? </Text>
						<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}}>
							<Text style={[t.textBlue400]}>Har redan ett konto?</Text>
						</TouchableOpacity>
					</View>

					<View style={[t.wFull,t.mR32, t.mT2]}>
						<Text style={[t.textRed400, t.selfEnd, t.textMd ]}>{errorCode}</Text>
					</View>

					<View style={[t.justifyBetween, t.flexRow, t.wFull, t.pX12, t.mT4]}>
						<TouchableOpacity onPress={()=>{setViewIndex(viewIndex - 1)}}>
							<MaterialIcons name="keyboard-arrow-left" size={60} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{done()}}>
							<MaterialIcons name="keyboard-arrow-right" size={60} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			)
		}
	}

	return (
		<MainView>
				<Image source={require('../Images/logo.png')} style={[{ width:253, height:60 }, t.selfCenter, t.mB8]} />
				<View style={[t.itemsCenter, t.justifyCenter]}>
					<ScrollView style={[t.wFull]}>
						{viewEntryCode()}
						{viewPersonalInfo()}
						{viewAccountInfo()}
					</ScrollView>
				</View>
		</MainView>
	)
}