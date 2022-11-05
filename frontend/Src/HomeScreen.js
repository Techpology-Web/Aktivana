import { View, Text, TextField } from 'react-native'
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";

export default function HomeScreen() {
  const [email, setEmail] = useState("alfred@stensatter.se");
  const [password, setPassword] = useState("password");
  const [acount, setAcount] = useState(null);
  

  return (
    <SafeAreaView style={[t.bgGray900,t.p5]} >
      
      <InputField val={e=>{setEmail(e)}}    placeholder="Din E-mail"                 icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} />
      <InputField val={e=>{setPassword(e)}} placeholder="Din E-mail" password={true} icon={<MaterialCommunityIcons name="key-outline"   size={24} color="#00000030" />} />
      
      <Button title="Logga in" onPress={()=>{
        alert(password)
        axios.post("acount/login",{
          "email": email,
          "password": password
        }).then(r=>{
          setAcount(r.data)
        })
      }} ></Button>
      
      
    </SafeAreaView>
  )
}