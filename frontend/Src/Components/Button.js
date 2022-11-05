import { View, Text,Image, TouchableOpacity } from 'react-native'
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

export default function Button(props) {


    return (
    
    <TouchableOpacity onPress={props.onPress} style={[t.border, t.p0, t.borderWhite, t.rounded,t.h12,t.justifyCenter,t.mY2]} >
        <Text style={[t.textCenter, t.textWhite,t.text2xl]} >{props.title}</Text>
    </TouchableOpacity> )

}
