import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { t } from "react-native-tailwindcss"

// Animations
import * as Animatable from 'react-native-animatable';

export default function ListSelector(props) {

	const [vals, setVals] = useState(props.vals);
	const [val, setVal] = useState(0);

	const [isDropdown, setIsDropDown] = useState(false);

	const showOptions = () =>
	{
		const listVals = vals.map((v, index)=>
			<TouchableOpacity onPress={()=>{setVal(index); setIsDropDown(false); props.val(index);}}>
				<Text style={[t.mX4, t.mY4]}>{v}</Text>
			</TouchableOpacity>
		);

		return(
			<View style={[{backgroundColor: "#FFFFFFef"}, t.roundedLg, t.mX2]}>
				{listVals}
			</View>
		)
	}

	return (
		<Animatable.View animation="fadeInUp">
			<View style={[t.flexCol, t.mX12, t.mY6]}>
				<Text style={[t.textLg, t.mL2, t.mB1, t.fontLight, t.textWhite]}>{props.title}</Text>
				<TouchableOpacity onPress={()=>{setIsDropDown(!isDropdown)}}>
					<View style={[{backgroundColor: "#FFFFFF"}, t.wFull, t.shadowMd, t.roundedFull, t.h12, t.pX6, t.textShadowMd, t.justifyCenter]}>
						<Text>{vals[val]}</Text>
					</View>
					{(isDropdown) ? showOptions(): <></>}
				</TouchableOpacity>
			</View>
		</Animatable.View>
	)
}