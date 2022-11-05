import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { t } from "react-native-tailwindcss";

export default function InputField(props) {
	return (
		<View style={[t.wFull, t.mT8, t.flexRow, t.justifyCenter]}>
			<TextInput
				style={[{height: 45}, t.mL8, t.bgWhite, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingLeft: 20}, t.w4_6]}
				placeholder={props.placeholder}
				onChangeText={(props.val)?props.val:()=>{}}
                secureTextEntry={props.password}
                keyboardType={props.keyboardType}
			 />
			 <View style={[t.bgWhite, {width: 55, height: 45}, {borderTopRightRadius: 5, borderBottomRightRadius: 5}, t.mR4, t.itemsCenter, t.justifyCenter]}>
				{(props.icon)?props.icon:""}
			 </View>
		</View>
	)
}