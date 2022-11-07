import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { t } from "react-native-tailwindcss"

// Animations
import * as Animatable from 'react-native-animatable';

export default function SlideUp(props) {
  return (
	<View style={[t.absolute, t.wFull, t.hFull, t.bgWhite, {backgroundColor: "rgba(14,14,14,0.72)"}, t.justifyEnd, t.z50]}>
		<TouchableOpacity onPress={props.close} style={[{height:"36%"}]} />
		<Animatable.View animation="slideInUp" style={[t.wFull, { height:"64%", backgroundColor: "#090909", borderTopLeftRadius: 30, borderTopRightRadius: 30}, t.flexCol ]}>
			{props.children}
		</Animatable.View>
	</View>
  )
}