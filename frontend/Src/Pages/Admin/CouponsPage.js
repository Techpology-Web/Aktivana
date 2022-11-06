import { ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {t} from "react-native-tailwindcss"

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import axios from "axios";

// Animations
import { View, Text } from "react-native-animatable";
import * as Animatable from 'react-native-animatable';

// Utils
import { isSearched } from "../../global_funcs";

// Components
import MainView from "../../Components/MainView";
import TextInputField from "../../Components/TextInputField";
import SlideUp from "../../Components/SlideUp";
import InputField from "../../Components/InputField";
import ListSelector from "../../Components/ListSelector";

function Coupon(props){
	return (
		<Animatable.View animation={(props.count%2==0?"fadeInRight":"fadeInLeft")}>
			<TouchableOpacity onPress={props.onPress} style={[t.bgWhite,t.roundedLg,t.h12,t.justifyCenter,t.p2,t.mB3]} >
				<Text style={[t.textLg, t.fontLight]}>{props.code}</Text>
			</TouchableOpacity>
		</Animatable.View>
	);
}

export default function CouponsPage(props){

	const [coupons,setCoupons] = useState([])
	const [searchWord,setSearchWord] = useState("")

	useEffect(()=>{
		getPartners();

		axios.post("code/get/").then(r=>{
			setCoupons([])
			
			setCoupons(r.data)
		}).catch(error=>{
			alert(error.response.data)
			setCoupons([])
		});
	},[])

	const getCoupons = coupons.map((coupon,index) => 
		(searchWord === "" || isSearched(searchWord,coupon)) ?
		<Coupon key={index} count={index} onPress={()=>alert("set selected coupon "+JSON.stringify(coupon))} code={coupon.code} ></Coupon> :
		<></>
	);
		
	const back = () =>{
		props.navigation.goBack()
	}

	const [isSlideUp, setIsSlideUp] = useState(false)
	const [name, setName] = useState("")
	const [partner, setPartner] = useState("")
	const [img, setImg] = useState("")

	const [arrPartners, setArrPartners] = useState([])
	const [arrPartnersNames, setArrPartnersNames] = useState([])

	const getPartners = () =>
	{
		axios.get("partner/get/all")
		.then(resp=>{
			setArrPartners(resp.data)
			var x = []
			resp.data.forEach(element => {
				x.push(element.name)
			});
			setArrPartnersNames(x)
		})
		.catch(error=>{
			alert(error.response.data)
		})
	}

	return(
		<View style={[t.wFull, t.hFull]}>
			
			{(isSlideUp) ? 
			<SlideUp>
				<View>
					<View style={[t.wFull, t.justifyBetween, t.flexRow, t.pY8, t.pX12, t.itemsCenter]}>
						<Text style={[t.textWhite, t.text3xl]}>{(name == "") ? "Skapa kod" : name}</Text>
						<TouchableOpacity onPress={()=>{setIsSlideUp(false)}}>
							<MaterialCommunityIcons name="close-thick" size={24} color="white" />
						</TouchableOpacity>
					</View>
					
					<Text style={[t.textWhite, t.fontLight, t.textLg, t.mL16, t.mT4]}>Name</Text>
					<InputField placeholder="name" style={[t.mT2]} />

					<ListSelector title="Partner" vals={arrPartnersNames} val={(e)=>{setPartner(e)}} />

				</View>
			</SlideUp>
			:
			<></>
			}

			<SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"},t.p5]} >
				<View style={[t.flexRow, t.justifyBetween, t.mB24, t.mT4, t.itemsCenter, t.z20]} >
					<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.p4]} >
						<MaterialIcons name="arrow-back-ios" size={24} color="white" />
					</TouchableOpacity>
					<Text style={[t.textWhite,t.text2xl]} >Alla Erbjudanden</Text>
				</View>
				
				<Animatable.View animation="slideInRight" style={[t.absolute, t.wFull, t.hFull, t.itemsEnd, t.justifyEnd]}>
					<View style={[{backgroundColor:"#68F900", width: 60, height: 60}, t.itemsCenter, t.justifyCenter, t.roundedFull]}>
						<TouchableOpacity onPress={()=>{setName(""); setPartner(""); setImg(""); setIsSlideUp(true)}}>
							<Ionicons name="add" size={50} color="black" />
						</TouchableOpacity>
					</View>
				</Animatable.View>

				<View>
					<Animatable.View animation="slideInDown">
						<TextInputField style={[t.roundedFull]} placeholder="Sök" onChangeText={setSearchWord} icon={<Ionicons style={{transform:[{scaleX:-1}]}} 
										name="search-outline" size={24} color="light-gray" />} />
					</Animatable.View>
					<ScrollView style={[t.pT12,t.mB12]}>
						{(coupons.length>0)?getCoupons:<></>}
					</ScrollView>
				</View>
			</SafeAreaView>
		</View>
	)
}