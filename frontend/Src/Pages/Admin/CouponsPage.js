import { ImageBackground, ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
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

	const [isSlideUp, setIsSlideUp] = useState(false)
	const [name, setName] = useState("")
	const [partner, setPartner] = useState(0)
	const [expiry, setExpiry] = useState("")
	const [useAmt, setUseAmt] = useState("")
	const [img, setImg] = useState("")
	const [imgPath, setImgPath] = useState("")
	const [extension, setExtension] = useState("")

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

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			base64: true,
			quality: 0.7,
		});

		var z = result.uri.split("/")
	
		if (!result.cancelled) {
			var ext = z[z.length - 1].split(".")[1]
			setImg(result.base64);
			setImgPath(result.uri)
			setExtension(ext)
		}
	}

	const NewCoupon = () =>
	{
		var exp = new Date(expiry).getTime() / 1000
		axios.post("code/add/", {
			name: name,
			partner: arrPartners[parseInt(partner)]["id"],
			image: img,
			ext: extension,
			expire: exp,
			use: useAmt
		})
		.then(resp=>{
			alert(resp.data)
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
					<ScrollView>
						<Animatable.View animation="fadeInUp">
							<View style={[t.wFull, t.justifyBetween, t.flexRow, t.pY8, t.pX12, t.itemsCenter]}>
								<Text style={[t.textWhite, t.text3xl]}>{(name == "") ? "Skapa kod" : name}</Text>
								<TouchableOpacity style={[t.p2]} onPress={()=>{setIsSlideUp(false)}}>
									<MaterialCommunityIcons name="close-thick" size={24} color="white" />
								</TouchableOpacity>
							</View>
						</Animatable.View>
						
						<Animatable.View animation="fadeInUp">
							<Text style={[t.textWhite, t.fontLight, t.textLg, t.mL16, t.mT4]}>Name</Text>
							<InputField text={name} val={(e)=>{setName(e)}} placeholder="name" style={[t.mT2]} />
						</Animatable.View>

						<ListSelector title="Partner" vals={arrPartnersNames} val={(e)=>{setPartner(e)}} />

						<Animatable.View animation="fadeInUp" style={[t.mB4]}>
							<Text style={[t.textWhite, t.fontLight, t.textLg, t.mL16]}>Expiry date</Text>
							<InputField text={expiry} val={(e)=>{setExpiry(e)}} placeholder="yyyy-mm-dd" style={[t.mT2]} />
						</Animatable.View>

						<Animatable.View animation="fadeInUp" style={[t.mB4]}>
							<Text style={[t.textWhite, t.fontLight, t.textLg, t.mL16]}>Use amount</Text>
							<InputField text={useAmt} val={(e)=>{setUseAmt(e)}} placeholder="1" style={[t.mT2]} />
						</Animatable.View>

						<Animatable.View animation="fadeInUp">
							<TouchableOpacity onPress={()=>{pickImage();}}>
								<ImageBackground source={{uri: imgPath}} style={[{height: 200, backgroundColor: "#FFFFFF50"}, t.mX8, t.roundedLg, t.mT2, t.itemsCenter, t.justifyCenter]}>
									<Text style={[t.textWhite, t.textXl, t.fontLight]}>Change image</Text>
								</ImageBackground>
							</TouchableOpacity>
						</Animatable.View>

						<Button title="Klar" style={[t.mX8, t.mT2, t.mB4]} onPress={()=>{NewCoupon()}} />
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
				
				<Animatable.View animation="slideInRight" style={[t.absolute, t.wFull, t.hFull, t.itemsEnd, t.justifyEnd]}>
					<View style={[{backgroundColor:"#68F900", width: 60, height: 60}, t.itemsCenter, t.justifyCenter, t.roundedFull]}>
						<TouchableOpacity onPress={()=>{setName(""); setPartner(""); setImg(""); setIsSlideUp(true); setImgPath(""); setExpiry(""); setUseAmt("");}}>
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