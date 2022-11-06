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
import Menu from '../Components/Menu';

export default function HomeScreen(props) {

	const [show,setShow] = useState(false)

  	return (
		<MainView>
				

			<Animatable.View animation="slideInUp" style={[t.flex,t.justifyCenter,t.itemsCenter]} >
				<View style={[t.mB24]} >
					<Text onPress={()=>{}} style={[t.textWhite,t.text6xl]} >Hello</Text>
				</View>
			</Animatable.View>
		
			<Menu navigation={props.navigation} >
				<TouchableOpacity onPress={()=>{props.navigation.navigate("AdminCouponsPage")}} ><Text style={[t.textWhite, t.text2xl, t.fontLight, t.mB2]} >Alla rabatter</Text></TouchableOpacity>
				<TouchableOpacity onPress={()=>{props.navigation.navigate("AdminCouponsPage")}} ><Text style={[t.textWhite, t.text2xl, t.fontLight, t.mB2]} >Användare</Text></TouchableOpacity>
			</Menu>
		
		</MainView>
  	)
}
