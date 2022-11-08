import React, { useState } from 'react'
import {
	SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { View, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native';
import {t} from "react-native-tailwindcss"

export default function MainView (props){
    
    let ScreenHeight = Dimensions.get("window").height+90;

    return (
      <SafeAreaProvider>
        <ImageBackground source={require('../Images/background.png')} style={[t.wFull, t.hFull]}>
          <SafeAreaView style={[t.hFull]}>
            <View style={[t.justifyCenter, t.hFull]}>
                {props.children}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaProvider>
    )
}
