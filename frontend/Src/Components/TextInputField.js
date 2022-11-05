import { View, Text,TextInput, TouchableOpacity } from 'react-native'
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

	//style={[t.border, t.p0, t.borderWhite, t.rounded,t.h12,t.justifyCenter,t.mY2]}
    return (
		<View style={[t.border, t.p2, t.bgWhite, t.roundedLg,t.h12,t.justifyCenter,t.mY2]} >
			<TextInput placeholder='Din E-mal' />
			<Image  
				source={{uri:"https://cdn-icons-png.flaticon.com/512/546/546394.png"}}
			/>
		</View>
	)

}
