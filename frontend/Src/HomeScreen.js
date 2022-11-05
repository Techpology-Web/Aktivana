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
      <Text>HomeScreen</Text>
      
      <InputField placeholder="Din E-mail" />
      
      <Button title="Logga in" onPress={()=>{alert("Logga in")}} ></Button>
      
    </SafeAreaView>
  )
}