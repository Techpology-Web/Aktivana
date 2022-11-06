import * as React from "react";
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import HomeScreen from "./Src/Pages/HomeScreen";
import Signup from "./Src/Pages/Signup";
import Login from "./Src/Pages/Login";
import AdminCouponsPage from "./Src/Pages/Admin/CouponsPage";

const Stack = createNativeStackNavigator();

export default function App() {
	// axios.defaults.baseURL = 'http://api.aktivana.com/';
	axios.defaults.baseURL = 'http://192.168.10.238:8000/';
	//axios.defaults.baseURL = 'http://192.168.1.189:8000/';


	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="AdminCouponsPage" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home"	component={HomeScreen}/>
				<Stack.Screen name="Signup"	component={Signup}/>
				<Stack.Screen name="Login"	component={Login}/>
				<Stack.Screen name="AdminCouponsPage"	component={AdminCouponsPage}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}