import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { t } from "react-native-tailwindcss";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';

import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

export default function Scan(props){
    const [permission, requestPermission] = Camera.useCameraPermissions();
	const [isScanned, setIsScanned] = useState(false)

    return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]}>
                <View style={[t.absolute, t.wFull, t.mT4, t.flexRow, t.itemsCenter, t.justifyBetween, t.pX4, t.z10]}>
					<TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
						<MaterialIcons name="keyboard-arrow-left" size={45} color="black" />
					</TouchableOpacity>
					<Text style={[t.mR1, t.fontLight]}>Scan product</Text>
				</View>
				<BarCodeScanner
					style={StyleSheet.absoluteFillObject}
					type={CameraType.back}
					onBarCodeScanned={(e)=>{
						if(!isScanned)
						{
							setIsScanned(true)
						}
					}} />
            </View>
       </SafeAreaView>
        )
}
