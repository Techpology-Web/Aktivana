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
import TextInputField from './Components/TextInputField';

export default function HomeScreen() {
  const [text,setText] = useState("")
  
  return (
    <SafeAreaView style={[t.bgGray900,t.p5]} >
      <Text>HomeScreen</Text>
      <TextInputField placeholder="Din E-mail" email={true} onChangeText={(e)=>{setText(e)}} ></TextInputField>
      <TextInputField placeholder="Password" password={true} onChangeText={(e)=>{setText(e)}} ></TextInputField>
      <Button title="Logga in" onPress={()=>{alert("Logga in")}} ></Button>
      <Text>{text}</Text>
    </SafeAreaView>
  )
}