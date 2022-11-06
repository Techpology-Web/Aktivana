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

    return (
		<View style={[t.border, t.p2, t.bgWhite, t.roundedLg,t.h12,t.justifyCenter,t.mY2]} >
			<TextInput placeholder='Din E-mal' />
			{(props.icon)?props.icon:""}
		</View>
	)

}
