import * as React from "react";
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import Template from "./Src/Template";
import HomeScreen from "./Src/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	// axios.defaults.baseURL = 'http://api.aktivana.com/';
	//axios.defaults.baseURL = 'http://192.168.10.238:8000/';
	axios.defaults.baseURL = 'http://192.168.1.189:8000/';

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Template" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home"	component={HomeScreen}/>
				<Stack.Screen name="Template"	component={Template}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}