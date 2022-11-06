import { View,TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {t} from "react-native-tailwindcss"

export default function TextInputField(props) {
	/*
		showText is so when the user pressed the key they can toogle
		to see password or not
	*/
	const [showText,setShowText] = useState(props.password)

	function iconPress(){
		if(props.password){
			setShowText(!showText);
		}
	}

    return (
		<View style={[t.border,t.pR3, t.bgWhite, t.roundedLg,t.h12,t.justifyCenter,t.itemsCenter,t.mY3,t.flex,t.flexRow,t.border0]} >
			<TextInput secureTextEntry={showText} onChangeText={props.onChangeText} style={[{width:"93%",height:"100%"},t.pX4]} placeholder={props.placeholder} />
			<TouchableOpacity onPress={()=>{iconPress()}} >{(props.icon)?props.icon:""}</TouchableOpacity>
		</View>
	)

}
