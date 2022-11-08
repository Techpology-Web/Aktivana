import { Dimensions, FlatList, ImageBackground, ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {t} from "react-native-tailwindcss";
import * as ImagePicker from 'expo-image-picker';

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
import Button from "../../Components/Button";


function Coupon(props){

	return (
		<Animatable.View animation={"bounceIn"} style={[{width:110,height:110,marginHorizontal:3},t.mB3]} >
			<TouchableOpacity onPress={props.onPress} style={[t.justifyCenter,t.p2,t.itemsCenter,{backgroundColor:"#2A2A2A",width:110,height:110, borderRadius:25}]} >
				<Text style={[t.textLg, t.fontLight,t.textWhite,t.textCenter]}>{props.code}</Text>
			</TouchableOpacity>
		</Animatable.View>
	);
}

export default function PartnersPage(props){

	const [coupons,setCoupons] = useState([])
	const [searchWord,setSearchWord] = useState("")
	const [isSlideUp, setIsSlideUp] = useState(false)
	const [selectedPartner, setSelectedPartner] = useState({})
    

	const updateCodeList = () =>
	{
		axios.get("partner/get/all").then(r=>{
			setCoupons(r.data)
		}).catch(error=>{
			alert(error.response.data)
		});
	}

	useEffect(()=>{
		updateCodeList();
	},[])

    const edit = () =>
    {
        setSelectedPartner({
            name:"",
            email:"",
            phone:"",
            adress:"",
            website:"",
        })
        setIsSlideUp(true)
    }

	return(
		<View style={[t.wFull, t.hFull]}>
			
			{(isSlideUp) ? 
			<SlideUp close={()=>{setIsSlideUp(false)}}>
				<View>
					<ScrollView>
                        <View style={[t.wFull, t.justifyBetween, t.flexRow, t.pY5, t.pX12, t.itemsCenter]}>
                            <Text style={[t.textWhite, t.text3xl]}>Skapa ny partner</Text>
                        </View>
                        <View style={[t.p5]} >
                            <TextInputField default={selectedPartner.name} keyboardType="default" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras Namn" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="label-outline" size={24} color="#fff" />} ></TextInputField>
                            <TextInputField default={selectedPartner.phone} keyboardType="phone-pad" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras Telefonnummer" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="phone-outline" size={24} color="#fff" />} ></TextInputField>
                            <TextInputField default={selectedPartner.email} keyboardType="email-address" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras E-mail" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="email-outline" size={24} color="#fff" />} ></TextInputField>
                            <TextInputField default={selectedPartner.adress} keyboardType="default" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras Adress" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="post-outline" size={24} color="#fff" />} ></TextInputField>
                            <TextInputField default={selectedPartner.website} keyboardType="url" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras Hemsida" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="web" size={24} color="#fff" />} ></TextInputField>
                            <Button>Skapa</Button>
                        </View>
                        
					</ScrollView>
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
				
				<Animatable.View animation="slideInRight" style={[t.absolute, t.z10, {bottom:55,right:25}]}>
					<View style={[{backgroundColor:"#68F900", width: 60, height: 60}, t.itemsCenter, t.justifyCenter, t.roundedFull]}>
						<TouchableOpacity onPress={edit}>
							<Ionicons name="add" size={50} color="black" />
						</TouchableOpacity>
					</View>
				</Animatable.View>

				<View style={[{height:"80%"}]} >
					<Animatable.View animation="slideInDown">
						<TextInputField style={[t.roundedFull]} placeholder="Sök" onChangeText={setSearchWord} icon={<Ionicons style={{transform:[{scaleX:-1}]}} 
										name="search-outline" size={24} color="light-gray" />} />
					</Animatable.View>
					{(coupons.length>0)?
						(<FlatList
							scrollEnabled={true}
							numColumns={3}
							data={coupons}
							renderItem={({item, index}) => (
								(searchWord === "" || isSearched(searchWord,item)) ?
								<Coupon key={index} count={index} onPress={()=>{setIsSlideUp(true);setSelectedPartner(item)}} code={item.name} ></Coupon> :
								<></>)
							}
						/>):
						<></>
					}
						
				</View>
			</SafeAreaView>
		</View>
	)
}
