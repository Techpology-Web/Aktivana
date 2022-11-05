import * as React from "react";
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import HomeScreen from "./Src/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	// axios.defaults.baseURL = 'http://api.aktivana.com/';
	axios.defaults.baseURL = 'http://192.168.10.238:8000/';
	//axios.defaults.baseURL = 'http://192.168.1.189:8000/';

	const testConn = () =>
	{
		axios.get("test")
		.then(resp => { alert(resp.data) })
		.catch(error => { alert(error.message) })
	}

	React.useEffect(()=>{
		//testConn();
	})

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home"	component={HomeScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}