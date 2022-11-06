import React, { useState } from 'react'
import { TouchableOpacity,Text } from 'react-native';
import {t} from "react-native-tailwindcss"

import MainView from '../Components/MainView';

export default function Signup(props) {

  return (
   <MainView>
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}} >
            <Text style={[t.textWhite,t.fontLight,t.textSm,t.textGreen300]}> Skapa Konto </Text>
        </TouchableOpacity>
   </MainView>
  )
}
