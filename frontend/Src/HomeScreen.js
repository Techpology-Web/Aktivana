import { View, Text, TextField, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import Button from './Components/Button';
import {t} from "react-native-tailwindcss"
import InputField from './Components/InputField';
import TextInputField from './Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { Dimensions } from 'react-native';

export default function HomeScreen() {
  const [email, setEmail] = useState("alfred@stensatter.se");
  const [password, setPassword] = useState("password");
  const [acount, setAcount] = useState(null);
  
  let ScreenHeight = Dimensions.get("window").height+20;
  return (
    <SafeAreaView style={[t.bgGray900]} >
      <View  >
        <ImageBackground source={require('./background.png')} style={[{
          width: "100%",
          height: ScreenHeight,
          justifyContent:'center' 
        }]} >
          <View style={[t.mX12]} >

            <InputField placeholder="Din E-mail" icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} ></InputField>
            
            <TextInputField></TextInputField>

            <Button title="Logga in" ></Button>
          </View>
          
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}
