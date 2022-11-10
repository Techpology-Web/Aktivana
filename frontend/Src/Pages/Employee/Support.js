import React, { useEffect, useRef, useState } from "react";
import {t} from "react-native-tailwindcss";
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import { View, Text, Image,  } from "react-native-animatable";
import Menu from "../../Components/Menu";
import { ScrollView, TouchableOpacity, TextInput, BackHandler } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';
import SlideUp from "../../Components/SlideUp";
import TextInputField from "../../Components/TextInputField";
import Button from "../../Components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SupportButton(props){
    return (
        <Animatable.View animation="bounceIn" >
            <TouchableOpacity onPress={props.onPress} style={[t.border2,t.borderWhite,t.flexRow,t.p2,t.roundedFull,t.itemsCenter,t.justifyEvenly,t.mB4]} >
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
        </Animatable.View>
    )
}

export default function Support (props){

    const [isSlideUp, setIsSlideUp] = useState(false)
    const [mode, setMode] = useState("")
    
    const slider = useRef(null)
    
	return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]} >
            {(isSlideUp) ? 
			<SlideUp navigation={props.navigation} close={()=>setIsSlideUp(false)} >
                <Animatable.View  >
                    <Text style={[t.textWhite,t.text3xl,t.textCenter,t.mT2]} >{mode}</Text>
					<ScrollView style={[t.pX5]} >
                            <TextInputField keyboardType="email-address" inputStyle={t.textWhite} placeholderTextColor="#8a8a8a" placeholder="Din E-mail" style={[t.border,{borderRadius:15},t.borderWhite,{backgroundColor:"#ffffff00"},t.textWhite]} icon={<MaterialCommunityIcons name="email-outline" size={24} color="#fff" />} ></TextInputField>
                            
                            <View>
                                <Text style={[t.textWhite,t.mB2,t.textLg]} > Beskriv problemet </Text>
                                <TextInput style={[t.textWhite,t.border, t.borderWhite,{borderRadius:15,textAlignVertical: 'top'},t.p4]} placeholderTextColor="#8a8a8a" placeholder="Beskriv ditt problem" multiline={true} numberOfLines={10}/>
                            </View>

                            <Button style={{borderRadius:15,marginTop:40}} >Skicka</Button>
                        
					</ScrollView>
				</Animatable.View>
			</SlideUp>
			:
			<></>
			}

                <Menu
                    navigation={props.navigation} 
                    paths={[
                        {path:"EmployeeHome"    ,name:"Hem"},
                        {path:"AdminCouponsPage",name:"Mina erbjudanden"},
                        {path:"Support"			,name:"Kontakta oss"},
                        {path:"AdminCouponsPage",name:"Om oss"},
                    ]}
                />
                <Animatable.View animation="bounceInUp" >
                    <View style={[t.flexRowReverse,t.p2]} >
                        <Image source={require('../../Images/logo1.png')} style={[{
                                width: 321*0.7,
                                height: 113*0.7,
                                resizeMode: 'contain'                       
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
                </Animatable.View>
                
                <View style={[t.p12]} >
                    <SupportButton onPress={()=>{setIsSlideUp(true);setMode("Hjälp")}} icon={<MaterialIcons name="support-agent" size={40} color="white" />} >Support</SupportButton>
                    <SupportButton onPress={()=>{setIsSlideUp(true);setMode("Rapportera bugg")}} icon={<Ionicons name="bug-outline"        size={40} color="white" />} >Buggar </SupportButton>
                </View>
            </View>
		</SafeAreaView>
	)
}
