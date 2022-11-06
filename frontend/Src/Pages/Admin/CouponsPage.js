import React, { useEffect, useState } from "react";
import { ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import MainView from "../../Components/MainView";
import TextInputField from "../../Components/TextInputField";

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {t} from "react-native-tailwindcss"
import axios from "axios";
import { isSearched } from "../../global_funcs";



function Coupon(props){

    return (
        <TouchableOpacity onPress={props.onPress} style={[t.bgWhite,t.roundedLg,t.h12,t.justifyCenter,t.p2,t.mB3]} >
            <Text style={[t.textLg, t.fontLight]}>{props.code}</Text>
        </TouchableOpacity>
    )
}


export default function CouponsPage(props){

    const [coupons,setCoupons] = useState([])
    const [searchWord,setSearchWord] = useState("")

    useEffect(()=>{
        axios.post("code/get").then(r=>{
            setCoupons(r.data)
        }).catch(error=>{
            setCoupons([])
        })
    
    },[])

    const getCoupons = coupons.map(coupon => 
        (searchWord === "" || isSearched(searchWord,coupon)) ?
        <Coupon onPress={()=>alert("set selected coupon "+JSON.stringify(coupon))} code={coupon.code} ></Coupon> :
        <></>
    );
        
    const back = () =>{
        props.navigation.goBack()
    }

    return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"},t.p5]} >
            <View style={[t.flex,t.flexRow,t.justifyBetween,t.mB24]} >
                <TouchableOpacity onPress={back} >
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={[t.textWhite,t.text2xl]} >Alla Erbjudanden</Text>
            </View>
            <View>
                <TextInputField style={[t.roundedFull]} placeholder="Sök" onChangeText={setSearchWord} icon={<Ionicons style={{transform:[{scaleX:-1}]}} name="search-outline" size={24} color="light-gray" />} ></TextInputField>
                <ScrollView style={[t.pT12,t.mB12]}>
                    {(coupons.length>0)?getCoupons:<></>}
                </ScrollView>
                
            </View>
        </SafeAreaView>
    )
}