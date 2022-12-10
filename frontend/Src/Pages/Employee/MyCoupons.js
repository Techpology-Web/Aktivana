import React, { useEffect, useRef, useState } from "react";
import {t} from "react-native-tailwindcss";
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import { View, Text, Image,  } from "react-native-animatable";
import Menu from "../../Components/Menu";
import { ScrollView, TouchableOpacity, TextInput, BackHandler, ImageBackground } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';
import SlideUp from "../../Components/SlideUp";
import TextInputField from "../../Components/TextInputField";
import Button from "../../Components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

function Coupon(props){ //  aspectRatio:16/9
    return (
        <Animatable.View animation="bounceIn" delay={props.count*100} style={[t.mB2]} >
            <TouchableOpacity onPress={props.onPress} >
                <Image style={[{height:200 ,borderRadius:20}]} source={{uri:(props.img.includes("data"))?props.img:axios.defaults.baseURL+props.img}} />
            </TouchableOpacity>
        </Animatable.View>
    )
}

export default function Support (props){

    const [isSlideUp, setIsSlideUp] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [selectedCoupon, setSelectedCoupon] = useState({
        code       :"Npc30",
        partner    : {name   :"Padelcenter", adress : "Fredriksdalsgatan 44, 602 23 Norrköping"},
        expireTime : "2022-11-24",
        useTime    : "1"
    })
    
    let qrcodeValue = JSON.stringify({
        "accountId": global.session["id"],
        "codeId": selectedCoupon["id"]
    });
    
    
    const fetchCoupons = () =>{
        axios.post("account/getCodes/",{id:global.session["id"]}).then(r=>{
            setCoupons(r.data)
        }).catch(error=>{
            alert(error)
        });
    }

    const setSelected = (coupon) => {
        setSelectedCoupon(coupon);
        setIsSlideUp(true)
    }

    useEffect(()=>{
        fetchCoupons()
    },[])

    const toDate = (time) =>{
        var date = new Date(time * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;
        return currentDate
    } 
    
	return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]} >
                {(isSlideUp) ? 
                <SlideUp navigation={props.navigation} close={()=>setIsSlideUp(false)} >
                    <Animatable.View  style={[t.flexCol ,t.justifyBetween,t.hFull]} >
                        <View style={[t.flexRow,t.justifyCenter, t.itemsCenter, { height:"50%" }]} >
                            <View animation="fadeInDown" style={[t.p5,t.itemsCenter, {borderRadius:15, backgroundColor:"#fff"}]}>
                                <QRCode  value={qrcodeValue} size={150} />
                            </View>
                        </View>
                        <Animatable.View animation="fadeInUp" style={[t.p5, { height:"50%", borderRadius:30, backgroundColor:"#252525" }]} >
                            <Text style={[t.textWhite, t.fontLight, t.text4xl]} >{selectedCoupon.code}</Text>
                            <Text style={[t.textWhite, t.fontLight, t.text2xl]} >{selectedCoupon.partner.name}</Text>
                            <Text style={[t.textWhite, t.fontLight]} >{selectedCoupon.partner.adress}</Text>
                            <Text style={[t.textWhite, t.fontLight]} >Expires: {toDate(selectedCoupon.expireTime)}</Text>
                            <Text style={[t.textWhite, t.fontLight]} >Use: {selectedCoupon.useTime}</Text>
                            <Button onPress={()=>{setIsSlideUp(false)}} >Klar</Button>
                        </Animatable.View>

                    </Animatable.View>
                </SlideUp>
                :
                <></>
                }

                <Menu
                    navigation={props.navigation} 
                    paths={[
                        {path:"EmployeeHome"    ,name:"Hem"},
                        {path:"MyCoupons",name:"Mina erbjudanden"},
                        {path:"Support"			,name:"Kontakta oss"},
                        {path:"AboutUs"         ,name:"Om oss"},
                    ]}
                />
                <Text style={[t.textWhite, t.text3xl, t.selfEnd, t.p3, t.absolute,t.z10]} >Alla erbjudanden</Text>
                <View style={[]} >
                    <ScrollView>
                        <View style={[t.mB32]} ></View>
                        {(coupons.length>0)?coupons.map((coupon, index)=>
                            <Coupon key={index} count={index} onPress={()=>{setSelected(coupon)}} img={coupon.picture} ></Coupon>):
                            <Text>loading</Text>
                        }
                        

                    </ScrollView>
                </View>
            </View>
		</SafeAreaView>
	)
}
