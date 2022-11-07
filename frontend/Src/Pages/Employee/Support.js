import React, { useEffect, useState } from "react";
import {t} from "react-native-tailwindcss";
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import { View, Text,Image } from "react-native-animatable";
import Menu from "../../Components/Menu";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
function Button(props){


    return (
        <TouchableOpacity style={[t.border2,t.borderWhite,t.flexRow,t.p2,t.roundedFull,t.itemsCenter,t.justifyEvenly,t.mB4]} >
            <View >
                {props.icon}
            </View>
            <View >
                <Text style={[t.textWhite,t.text2xl,t.textCenter]} >{props.children}</Text>
            </View>
            <View style={[t.opacity0]} >
                {props.icon}
            </View>
        </TouchableOpacity>
    )
}

export default function Support (props){


	return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]} >
                <Menu
                    navigation={props.navigation} 
                    paths={[
                        {path:"EmployeeHome"    ,name:"Hem"},
                        {path:"AdminCouponsPage",name:"Mina erbjudanden"},
                        {path:"Support"			,name:"Kontakta oss"},
                        {path:"AdminCouponsPage",name:"Om oss"},
                    ]}
                />
                <View>
                    <View style={[t.flexRowReverse,t.p2]} >
                        <Image source={require('../../Images/logo.png')} style={[{
                            width:253*0.9,
                            height:60*0.9,
                            marginTop:10
                        }]} />
                    </View>
                    <View style={[t.p8]} >
                            <Text style={[t.textWhite,t.textLg,t.mB4,t.fontLight]}>
                                Vårat mål är att göra våra användare så nöjda som möjligt. Vi tar glädjeligen emot all form utav feedback från er användare så vi kan ta till oss den i vårat dagliga arbete för att förbättra appen.  Vi är självklart även väldigt öppna för nya eventuella samarbeten. 
                            </Text>
                            <Text style={[t.textWhite,t.textLg,t.fontLight]}>
                                Har du frågor, funderingar eller feedback som du vill dela med oss, tveka inte på att höra av er till oss
                            </Text>
                    </View>
                </View>
                
                <View style={[t.p12]} >
                    <Button icon={<MaterialIcons name="support-agent" size={40} color="white" />} >Support</Button>
                    <Button icon={<Ionicons name="bug-outline"        size={40} color="white" />} >Buggar</Button>
                </View>
            </View>
            
		</SafeAreaView>
	)
}
