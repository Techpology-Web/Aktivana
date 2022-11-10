import { BackHandler, Dimensions, FlatList, ImageBackground, ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {t} from "react-native-tailwindcss";
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import Menu from "../Components/Menu";

import { View, Text, Image } from "react-native-animatable";

function Member(props){
    return(
        <Animatable.View animation={"fadeIn"} style={[{backgroundColor:"#2A2A2A",height:250,borderRadius:30},t.relative,t.itemsCenter,t.mB16,t.justifyEnd,t.shadowLg]} >
            
            <Image style={[{width:220,height:200,borderRadius:20,position:"absolute",top:-30},t.shadowLg]} source={{uri:"http://lamiradadelreplicante.files.wordpress.com/2013/06/richardstallmanrms.jpg"}} />
            
            <View style={[t.mT12,t.wFull,{height:80,},t.p5]} >
                <Text style={[t.textWhite,t.fontLight,t.textXl]} >{props.role}</Text>
                <Text style={[t.textWhite,t.fontLight,t.textXl]} >{props.name}</Text>
            </View>
        </Animatable.View>
    )
}

export default function AboutUs(props){

	return(
        <SafeAreaProvider>
            <SafeAreaView style={[{backgroundColor:"#1E1E1E"}]} >
                <View>
                    <ScrollView style={[t.p5,t.mT12]}>
                        <Text style={[t.textWhite,t.text3xl,t.mB2]} >Om oss</Text>
                        <Text style={[t.textWhite,t.mB12]}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>

                        <Member role="Företagsledare/VD"    name="Richard Stallman" />
                        <Member role="Ekonomi"              name="Richard Stallman" />
                        <Member role="Hållbarhetsansvarig"  name="Richard Stallman" />
                        <Member role="Kommunikatör"         name="Richard Stallman" />
                        <Member role="Marknadsförare"       name="Richard Stallman" />

                    </ScrollView>
                    <Menu navigation={props.navigation} paths={[
                        {path:"EmployeeHome"    ,name:"Hem"},
                        {path:"AdminCouponsPage",name:"Mina erbjudanden"},
                        {path:"Support" 		,name:"Kontakta oss"},
                        {path:"AboutUs",        name:"Om oss"},
                    ]} />
                </View>
                
            </SafeAreaView>
        </SafeAreaProvider>
	)
}
