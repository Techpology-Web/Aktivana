import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import Button from '../../Components/Button';
import {t} from "react-native-tailwindcss"
import TextInputField from '../../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '../../Components/InputField';
import MainView from '../../Components/MainView';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Menu from '../../Components/Menu';

export default function HomeScreen(props) {

	const [show,setShow] = useState(false)

  	return (
		<MainView>
			<Animatable.View animation="slideInUp" style={[t.flex,t.justifyCenter,t.itemsCenter]} >
				<View style={{marginBottom:300}} >
					<Text onPress={()=>{}} style={[t.textWhite,t.text6xl]} >Hello</Text>
				</View>
			</Animatable.View>
		
			<Menu 
				navigation={props.navigation} 
				paths={[
					{path:"AdminCouponsPage",name:"Alla rabatter"},
					{path:"PartnersPage",name:"Partners"},
					{path:"CompanyPage",name:"Företag"},
					{path:"Employees",name:"Avändare"}
				]}
			/>
		
		</MainView>
  	)
}
