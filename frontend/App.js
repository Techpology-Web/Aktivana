import * as React from "react";
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import EmployeeHomeScreen from "./Src/Pages/Employee/HomeScreen";
import AdminHomeScreen from "./Src/Pages/Admin/HomeScreen";
import Signup from "./Src/Pages/Signup";
import Login from "./Src/Pages/Login";
import AdminCouponsPage from "./Src/Pages/Admin/CouponsPage";
import Support from "./Src/Pages/Employee/Support";
import PartnersPage from "./Src/Pages/Admin/PartnersPage";

import SignupScreen from "./Src/Pages/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	// axios.defaults.baseURL = 'http://api.aktivana.com/';
	axios.defaults.baseURL = 'http://192.168.10.238:8000/';
	//axios.defaults.baseURL = 'http://192.168.1.189:8000/';

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login"   screenOptions={{ headerShown: false }}>
				<Stack.Screen name="PartnersPage"		component={PartnersPage}/>
				<Stack.Screen name="AdminHome"			component={AdminHomeScreen}/>
				<Stack.Screen name="EmployeeHome"		component={EmployeeHomeScreen}/>
				<Stack.Screen name="Support"			component={Support}/>
				<Stack.Screen name="Signup"				component={SignupScreen}/>
				<Stack.Screen name="Login"				component={Login}/>
				<Stack.Screen name="AdminCouponsPage"	component={AdminCouponsPage}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}