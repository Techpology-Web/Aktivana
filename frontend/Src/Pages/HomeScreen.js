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
	const [slide,setSlide] = useState("slideOutLeft")

	let ScreenHeight = Dimensions.get("window").height+20;


	const nav = (
		<Animatable.View animation={slide} style={[t.flex,t.justifyCenter,t.itemsCenter,t.bgBlack,t.flex1,t.absolute,{width:"25%",height:ScreenHeight}]} >
        	<Text style={[t.textWhite,t.text6xl]} >Hello</Text>
      	</Animatable.View>
	)
  	return (
		<MainView>
				

			<Animatable.View animation="slideInUp" style={[t.flex,t.justifyCenter,t.itemsCenter]} >
				<View style={[]} >
					<Text onPress={()=>{}} style={[t.textWhite,t.text6xl]} >Hello</Text>
					<Text onPress={()=>{props.navigation.navigate("AdminCouponsPage")}} style={[t.textWhite,t.text4xl]} >{"Alla Erbjudanden"}</Text>
				</View>
			</Animatable.View>
			{<Menu></Menu>}
		</MainView>
  	)
}
