import { View, Text, Image } from 'react-native';
import React from 'react';
import { t } from "react-native-tailwindcss";
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

// Component
import Std_Bg from "./Images/Std_Bg";

// Images
import AktivanaLogo from "./Images/AktivanaLogo.png";

export default function Template() {
  return (
	<View style={[{backgroundColor: "#161616"}, t.absolute, t.wFull, t.hFull]}>
		<View style={[t.wFull, t.hFull, t.z0, t.absolute]}>
			<Std_Bg width={"100%"} height={"100%"} />
		</View>
		<SafeAreaView>
			<View style={[t.z10, t.wFull, t.hFull]}>
				<Image source={AktivanaLogo} style={[t.mT4, {width: 255, height: 65}]} />
			</View>
		</SafeAreaView>
	</View>
  )
}