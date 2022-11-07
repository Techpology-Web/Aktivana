import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { t } from "react-native-tailwindcss"

// Animations
import * as Animatable from 'react-native-animatable';

export default function SlideUp(props) {

	const [slide,setSlide] = useState("fadeInUpBig")
	const [color,setColor] = useState("rgba(14,14,14,0.72)")

	const close = () =>{
		if(slide === "fadeOutDownBig") props.close()
	}

  	return (
	<View style={[t.absolute, t.wFull, t.hFull, t.bgWhite, {backgroundColor: color}, t.justifyEnd, t.z50]}>
		<TouchableOpacity onPress={()=>{setSlide("fadeOutDownBig");setColor("rgba(14,14,14,0.0)")}} style={[{height:"36%"}]} />
		<Animatable.View onAnimationEnd={close} animation={slide} style={[t.wFull, { height:"64%", backgroundColor: "#090909", borderTopLeftRadius: 30, borderTopRightRadius: 30}, t.flexCol ]}>
			{props.children}
		</Animatable.View>
	</View>
  )
}