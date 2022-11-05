import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from 'axios';

export default function HomeScreen() {
  
  const [coupons,setCoupons] = useState([])
  

  useEffect(()=>{
    axios.post("employee/getCodes",{"id":3}).then(r=>{
      
      r.data.forEach(element => {
        
      });

    })

    setCoupons([<Text>hej</Text>,<Text>hej2</Text>])
  },[])

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      {coupons}
    </SafeAreaView>
  )
}