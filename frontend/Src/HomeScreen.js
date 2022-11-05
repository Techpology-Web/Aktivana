import { View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from 'axios';
import {t} from "react-native-tailwindcss"
import ListSelector from './Components/ListSelector';
import * as Animatable from 'react-native-animatable';


function Coupon(props){


  return (
    <TouchableOpacity onPress={()=>{props.onPress()}}  style={[t.bgBlue600, t.roundedLg, t.p10,t.text2xl,t.mY1]}  >
      <Text>{props.code}</Text>
    </TouchableOpacity>
  )
}

function Info(props){

  return(
    <Animatable.View animation="fadeInUp">
      <View style={[t.bgGray500,t.p16]}>
        <View style={[t.flex,t.flexRow,t.flex,]} >
          <Text style={[t.mY4]} >Coupon code </Text>
          <Text style={[t.textWhite,t.mY4]} >{props.coupon.code}</Text>
        </View>
        <View style={[t.flex,t.flexRow,t.flex,]} >
          <Text style={[t.mY4]} >Partner name </Text>
          <Text style={[t.textWhite,t.mY4]} >{props.coupon.partner.name}</Text>
        </View>
        <View style={[t.flex,t.flexRow,t.flex,]} >
          <Text style={[t.mY4]} >Image </Text>
          <Image
            style={{width: '100%', height: '50%'}}
            source={{uri:props.coupon.picture}}
          />     
         </View>
      </View>
    </Animatable.View>
  )

}

export default function HomeScreen() {
  
  const [coupons,setCoupons] = useState([])
  const [selectedCoupons,setSelectedCoupons] = useState()
  

  useEffect(()=>{
    axios.post("employee/getCodes",{"id":3}).then(r=>{
      let couponss = []
      r.data.forEach(element => {
        console.log(element.code)
        couponss.push(<Coupon onPress={()=>{setSelectedCoupons(<Info coupon={element} ></Info>)}} code={element.code} ></Coupon>)
      });
      setCoupons(couponss)
    })

  },[])

  return (
    <SafeAreaView style={[t.p10]} >
      <Text>HomeScreen</Text>
      <View  >
        <View style={[t.flex,t.flexCol,t.flex]} >
        {coupons}

        </View>
        {selectedCoupons}
      </View>
    </SafeAreaView>
  )
}