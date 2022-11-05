import { View, Image,TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from 'axios';
import {t} from "react-native-tailwindcss"
import * as Animatable from 'react-native-animatable';

export default function TextInputField(props) {

	function img() {
		
		let imge = ""
		if(props.password)
			imge = "data:image/png;base64,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"	
		if (props.email)
			imge = "https://cdn-icons-png.flaticon.com/512/546/546394.png"
		if(props.img)
			imge = props.img		
		
		if(imge!="")
			return <TouchableOpacity onPress={props.imageOnPress} >
						<Image 
							style={{width: 20, height: 20}}
							source={{uri:imge}}
						/>
					</TouchableOpacity>
			
		else
			return <></>
	}

    return (
		<View style={[t.border, t.p2, t.bgWhite, t.roundedLg,t.h12,t.justifyCenter,t.mY2,t.flex,t.flexRow,t.justifyStart,t.itemsCenter]} >
			<TextInput secureTextEntry={props.password} onChangeText={props.onChangeText} style={{width:"93%"}} placeholder={props.placeholder} />
			{img()}
		</View>
	)

}
