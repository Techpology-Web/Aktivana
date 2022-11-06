import React, { useState } from 'react'
import {t} from "react-native-tailwindcss"
import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import TextInputField from '../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../Components/Button';
import { StyleSheet } from 'react-native';

import MainView from '../Components/MainView';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function Signup(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password1, setPassword1] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [signupCode, setSignupCode] = useState("");
	const [error, setError] = useState("");

	const createAcount = () =>{
		//check if every entry is filled
		if(email != "" && password != "" && firstName != "" && lastName != "" && signupCode != ""){
			setError("") // reset error
			//post ssignup
			axios.post("acount/add",{
				"firstName"	 : firstName,				
				"lastName"	 : lastName,				
				"email"		 : email,				
				"password"   : password,				
				"signupCode" : signupCode,				
			})
			.then(r=>{
				alert(r.data)
			}).catch(error=>{
				//display error
				setError(error.response.data.toString())
			})
		}
		else{
			setError("Skriv in i alla fält")
		}
	}

	return (
		<MainView>
			<Animatable.View animation="fadeInUp">
				<View style={[t.mX8]} >
					<View style={[t.wFull,t.itemsCenter,t.mB5]} >
						<Image source={require('../Images/logo.png')} style={[{
						width:253,
						height:60,
						}]} />
					</View>

					<TextInputField onChangeText={setEmail} placeholder="Din E-mail"                  icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} ></TextInputField>
					
					<View style={styles.container} >
						<View style={styles.child} >
							<TextInputField onChangeText={setFirstName} placeholder="Förnamn"                 icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} ></TextInputField>
						</View>
						<View style={styles.child} >
							<TextInputField onChangeText={setLastName} placeholder="Efternamn"                 icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} ></TextInputField>
						</View>
					</View>
					<TextInputField onChangeText={setPassword} placeholder="Lösenord" password={true} icon={<MaterialCommunityIcons name="key-outline"   size={24} color="#00000030" />} ></TextInputField>
					<TextInputField onChangeText={e=>{setPassword1(e);setError((password!=e)?"Lösenorden stämmer inte":"")}} placeholder="Upprepa Lösenord" password={true} icon={<MaterialCommunityIcons name="key-outline"   size={24} color="#00000030" />} ></TextInputField>
					<View style={styles.container} >
						<View style={styles.child} >
							<TextInputField onChangeText={setSignupCode} placeholder="Inbjudnings kod"                 icon={<MaterialCommunityIcons name="key-outline" size={24} color="#00000030" />} ></TextInputField>
						</View>
						
					</View>
					<View style={[t.mB5,t.flex,t.flexRowReverse]} >
						<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}} >
						<Text style={[t.textWhite,t.fontLight,t.textSm,t.textGreen300]}> Logga in </Text>
						</TouchableOpacity>
						<Text style={[t.textWhite,t.fontLight,t.textSm,]}> Har du ett konto? </Text>
					</View>
					<Text style={[t.textRed600,t.textLg,]}> {error} </Text>

					<Button onPress={createAcount} title="Skapa konto"  disabled={true} ></Button>
				</View>
			</Animatable.View>
	</MainView>
	)
}
/**
 * flex with gap
 */
const gap = 8;
const children = 2;

const styles = StyleSheet.create({
	container: {
	  flexDirection: "row",
	  paddingHorizontal: (gap / -2),
	},
	child: {
	  marginHorizontal: gap / 2,
	  width: ((100/children)-(gap/2)/2).toString()+"%"
	},
  });