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
      let couponss = []
      r.data.forEach(element => {
        console.log(element.code)
        couponss.push(<Text>{element.code}</Text>)
      });
      setCoupons(couponss)

    })

  },[])

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      {coupons}
    </SafeAreaView>
  )
}