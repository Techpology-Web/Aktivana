import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import Button from '../Components/Button';
import {t} from "react-native-tailwindcss"
import TextInputField from '../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '../Components/InputField';
import MainView from '../Components/MainView';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

import SlicedInputField from '../Components/SlicedInputField';

export default function ForgotPasswordScreen(props) {
  return (
	<MainView>
		<Animatable.View animation="fadeInDown">
			<View style={[t.mX8]} >
				<View style={[t.wFull,t.itemsCenter]} >
					<Image source={require('../Images/logo.png')} style={[{
						width: 321*0.9,
						height: 113*0.9,
						resizeMode: 'contain'
					}]} />
				</View>

				<TextInputField placeholder="Din E-mail" icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} />

				<View style={[t.mB5,t.flex,t.flexRow, t.selfCenter]}>
					<Text style={[t.textWhite,t.fontLight,t.textSm]}> Vi kommer skicka en verifierings kod till din e-mail </Text>
				</View>
				<Text style={[t.textRight,t.textRed700,t.fontLight,t.textSm]}></Text>

				<Button onPress={()=>{}} title="Skicka" />

				<View style={[t.wFull, t.flexRow, t.justifyEnd, t.mT2]}>
					<Text style={[t.textWhite]}>Har redan ett konto? </Text>
					<TouchableOpacity onPress={()=>{props.navigation.navigate("Login")}}>
						<Text style={[t.textBlue400]}>Logga in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Animatable.View>
	</MainView>
  )
}