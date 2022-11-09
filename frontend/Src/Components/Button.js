import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import {t} from "react-native-tailwindcss"

export default function Button(props) {

	const {style, ...rest} = props;


    return (
        <TouchableOpacity onPress={props.onPress} style={[t.border, t.p0, t.borderWhite, t.rounded,t.h12,t.justifyCenter,t.mY2,{backgroundColor: 'rgba(255,255,255,0.05)' },style]} >
            <Text style={[t.textCenter, t.textWhite,t.text2xl,t.fontLight]} >{(props.title)?props.title:props.children}</Text>
        </TouchableOpacity>
    )
}
