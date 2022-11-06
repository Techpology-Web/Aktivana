
import React, { useRef, useState } from 'react'
import { Animated, Text,TouchableOpacity,View } from 'react-native'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import {t} from "react-native-tailwindcss"
import * as Animatable from 'react-native-animatable';
import { Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function Menu(props){

    const [show,setShow] = useState(false)
	const [margin,setMargin] = useState({ marginHorizontal : -300 })
    

	let ScreenHeight = Dimensions.get("window").height+20;
	let ScreenWidth = Dimensions.get("window").width;

    const menu = useRef(null);

    const setVisible = (value) => {
        if(value){
            menu.current.transitionTo( { marginHorizontal : -300 } );
        }else{
            menu.current.transitionTo( { marginHorizontal : -10 } );
        }
        setShow(value);
    }
    const logout = () =>{
        global.session = "undefined";
        props.navigation.navigate("Login");
    }

    return (
        <View  style={[t.bgBlue300r,t.flex,t.flexRow,t.absolute,t.top0,,{width:"100%",height:ScreenHeight}]} >
            <Animatable.View ref={menu} style={[t.flex,t.bgBlack,t.relative,{width:300,height:ScreenHeight, backgroundColor:"#1B1B1B"},margin]} >
        	    <View style={[t.mT24,t.mL8]} >
                    {props.children}    
                </View>
                <TouchableOpacity onPress={logout} style={[t.absolute,{bottom:15,right:15}]} >
                    <Text style={[t.textGreen600,t.textXl]} >Logga ut</Text>
                </TouchableOpacity>
      	    </Animatable.View>
            <TouchableOpacity onPress={()=>{setVisible(!show)}}  style={{backgroundColor:"#ffffff00",height:ScreenHeight,width:ScreenWidth-280}} ></TouchableOpacity>
            <TouchableOpacity style={[t.absolute,t.top0,t.text2xl,t.textWhite,t.m2]} onPress={()=>setVisible(!show)} ><Feather name="menu" size={50} color="white" /></TouchableOpacity>

        </View>
        
    )

}