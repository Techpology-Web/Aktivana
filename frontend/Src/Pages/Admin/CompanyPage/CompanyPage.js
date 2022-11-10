import { BackHandler, Dimensions, FlatList, ImageBackground, ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
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
import { isSearched } from "../../../global_funcs";

// Components
import MainView from "../../../Components/MainView";
import TextInputField from "../../../Components/TextInputField";
import SlideUp from "../../../Components/SlideUp";
import InputField from "../../../Components/InputField";
import ListSelector from "../../../Components/ListSelector";
import Button from "../../../Components/Button";

import CouponSelector from "./CouponSelector"

function Company(props){

	return (
		<Animatable.View animation={"bounceIn"} style={[{width:110,height:110,marginHorizontal:3},t.mB3]} >
			<TouchableOpacity onPress={props.onPress} style={[t.justifyCenter,t.p2,t.itemsCenter,{backgroundColor:"#2A2A2A",width:110,height:110, borderRadius:25}]} >
				<Text style={[t.textLg, t.fontLight,t.textWhite,t.textCenter]}>{props.code}</Text>
			</TouchableOpacity>
		</Animatable.View>
	);
}


export default function CompanysPage(props){

	const [coupons,setCoupons] = useState([])
	const [searchWord,setSearchWord] = useState("")
	const [isSlideUp, setIsSlideUp] = useState(false)
	const [selectedCompany, setSelectedCompany] = useState({})
	const [isEdit, setIsEdit] = useState(false)
	const [addCoupon, setAddCoupon] = useState(false)
    

    const fetchCompanys = () =>{
        axios.get("company/get/all").then(r=>{
            setCoupons(r.data)
        }).catch(error=>{
            //alert(error.response.data)
        });
    }

	useEffect(()=>{
        fetchCompanys()
    },[])

    const add = () =>
    {
        setSelectedCompany({
            name:"",
            email:"",
            activeCoupons:"[]",
			password:""
        })
        setIsSlideUp(true);
        setIsEdit(false);
    }

    const addOrUpdate = () =>{
        setIsSlideUp(false)

        if(isEdit){
            axios.post("company/update/",selectedCompany).then(r=>{
                //alert(r.data)
                fetchCompanys()
            }).catch(e=>{
                //alert(e.response.data)
            })
        }else{
            axios.post("company/add/",selectedCompany).then(r=>{
                //alert(r.data)
                fetchCompanys()
            }).catch(e=>{
                //alert(e.response.data)
            })
        }
    }
    const remove = () =>{
        setIsSlideUp(false)
        axios.post("company/remove/",{"id":selectedCompany.id}).then(r=>{
            fetchCompanys()
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    const updateSelectedCompany = (key,value) =>{
        selectedCompany[key] = value
    }
	return(
		<View style={[t.wFull, t.hFull]}>
			{(addCoupon)?(
                <CouponSelector selected={selectedCompany.activeCoupons} done={(e)=>{setAddCoupon(false);setIsSlideUp(true);updateSelectedCompany("activeCoupons",(e))}} />
            ):(<></>)}
			{(isSlideUp) ? 
			<SlideUp close={()=>{setIsSlideUp(false)}}>
				<View>
					<ScrollView>
                        <View style={[t.wFull,t.pT5,t.pX5]}>
                            <Text style={[t.textWhite, t.text3xl]}>Skapa nytt företag</Text>
                            
                        </View>
                        <View style={[t.pX5]} >
                            <TextInputField default={selectedCompany.name}    onChangeText={e=>updateSelectedCompany("name",e)}    keyboardType="default"       inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras Namn"          style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="label-outline" size={24} color="#fff" />} ></TextInputField>
                            <TextInputField default={selectedCompany.email}   onChangeText={e=>updateSelectedCompany("email",e)}   keyboardType="email-address" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Deras E-mail"        style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="email-outline" size={24} color="#fff" />} ></TextInputField>
                            <Button onPress={()=>{setAddCoupon(true);setIsSlideUp(false)}} >Hantera rabatter</Button>
                            {(!isEdit)?<Button onPress={()=>addOrUpdate()} >Skapa</Button>:(
                                <View style={[t.flexRow]} >
                                    <Button style={{marginLeft: 0,flex:1,paddingRight: 10}} onPress={()=>addOrUpdate()} >Updatera</Button>
                                    <Button style={{marginLeft: 10,flex:1,paddingRight: 10}} onPress={()=>remove()}     >Tabort</Button>
                                </View>
                            )}
                            
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
					<Text style={[t.textWhite,t.text2xl]} >Företag</Text>
				</View>
				
				<Animatable.View animation="slideInRight" style={[t.absolute, t.z10, {bottom:55,right:25}]}>
					<View style={[{backgroundColor:"#68F900", width: 60, height: 60}, t.itemsCenter, t.justifyCenter, t.roundedFull]}>
						<TouchableOpacity onPress={add}>
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
								<Company key={index} count={index} onPress={()=>{setIsSlideUp(true);setSelectedCompany(item);setIsEdit(true)}} code={item.name} /> :
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
