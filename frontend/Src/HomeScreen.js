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

export default function HomeScreen() {
  
  return (
    <SafeAreaView style={[t.bgGray900,t.p5]} >
      
      <InputField placeholder="Din E-mail" icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00000030" />} />
      <InputField placeholder="Din E-mail" password={true} icon={<MaterialCommunityIcons name="key-outline" size={24} color="#00000030" />} />
      
      <Button title="Logga in" onPress={()=>{alert("Logga in")}} ></Button>
      
    </SafeAreaView>
  )
}