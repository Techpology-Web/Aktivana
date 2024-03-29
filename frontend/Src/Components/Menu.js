import React, { useRef, useState } from 'react';
import { Animated, Text,TouchableOpacity,View, Image } from 'react-native';
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import {t} from "react-native-tailwindcss";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';

// Animations
import * as Animatable from 'react-native-animatable';


export default function Menu(props){

	const [show,setShow] = useState(false)
	const [margin,setMargin] = useState({ marginHorizontal : -300 })
	const [y,setY] = useState(0);

	//get screen size
	let ScreenHeight = Dimensions.get("window").height+20;
	let ScreenWidth = Dimensions.get("window").width;

	const menu = useRef(null); // manu to be animated

	const setVisible = (value) => {
		if(!value){
			menu.current.transitionTo( { marginHorizontal : -300 } );
		}else{
			menu.current.transitionTo( { marginHorizontal : -15 } );
		}
		setShow(value);
	}
	
	const logout = () =>{
		global.session = "undefined";
		console.log(global.session)
		props.navigation.navigate("Login");
	}
	// the elements that can be clicked to navigate to screens
	const elements = props.path != "undefined" ? props.paths.map((element,index)=>
			<TouchableOpacity 
				style={[t.p2,t.m05]}
				key={index}
				onPress={()=>{setVisible(false);props.navigation.navigate(element.path)}} >
				<Text style={[t.textWhite, t.text2xl, t.fontLight, t.mB2]} >{element.name}</Text>
			</TouchableOpacity>)
			:<></>
	
	const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80
	};

	return (
		<View style={[t.bgBlue300r, t.flexRow, t.absolute, t.top0, t.hFull]}>
			<GestureRecognizer onSwipeRight={()=>{setVisible(true)}} onSwipeLeft={()=>{setVisible(false)}} style={[t.z20, (show)? [t.wFull, t.hFull] : [{width:20}]]}>
				<Animatable.View 
					ref={menu}
					style={[t.flex,t.bgBlack,t.relative,{width:300, backgroundColor:"#1B1B1B"},margin, t.z20, t.hFull]}
					/*
						Hej ali om du ser detta var inte arg på mig
						Jag la till swiping för jag tyckte det var nice
						Om det inte funkar med scrollviewn äre bara att 
						tabort :>) men jag tyckte de var nice iaf :)
					*/
					onTouchStart={e=> {setY(e.nativeEvent.pageY);}}
					onTouchEnd={e => {
					if (y - e.nativeEvent.pageY > 5)
						setVisible(!show);
					}}>
					<View style={[t.justifyCenter,t.itemsCenter,t.mT2]} >
						<Image source={require('../Images/logo.png')} style={[{
								width: 321*0.7,
								height: 113*0.7,
								resizeMode: 'contain'
							}]} />
					</View>

					<View style={[t.mT5,t.mL8]} >
						{elements}
					</View>
					
					<TouchableOpacity onPress={logout} style={[t.absolute,{bottom:15,right:15}]} >
						<Text style={[t.textGreen600,t.textXl]} >Logga ut</Text>
					</TouchableOpacity>

				</Animatable.View>
			</GestureRecognizer>
			
			<TouchableOpacity style={[t.absolute,t.top0,t.text2xl,t.textWhite,t.m2,t.z10, t.p2]} onPress={()=>setVisible(!show)} >
				<Feather name="menu" size={50} color="white" style={[t.z10]} />
			</TouchableOpacity>

		</View>
		
	)

}