import React, { useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import { View, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native';
import {t} from "react-native-tailwindcss"

export default function MainView (props){
    
    let ScreenHeight = Dimensions.get("window").height+20;

    return (
        <SafeAreaView style={[t.bgGray900]} >
          <View  >
            <ImageBackground source={require('../Images/background.png')} style={[{
              width: "100%",
              height: ScreenHeight,
              justifyContent:'center' 
            }]} >
              {props.children}
              </ImageBackground>
          </View>
        </SafeAreaView>
    )
}
