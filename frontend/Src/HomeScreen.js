import { View, Text } from 'react-native'
import React from 'react'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import Button from './Components/Button';
import {t} from "react-native-tailwindcss"

export default function HomeScreen() {
  return (
    <SafeAreaView style={[t.bgGray900]} >
      <Text>HomeScreen</Text>
      <Button title="Logga in" onPress={()=>{alert("Logga in")}} ></Button>
    </SafeAreaView>
  )
}