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
import * as Animatable from 'react-native-animatable';
import Button from './Components/Button';


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
            style={{width: '100%', height: '100%'}}
            source={{uri:props.coupon.picture}}
          />     
         </View>
         <Button onPress={()=>{alert("uses "+ props.coupon.code);props.use()}} style={[t.bgGray200,t.p4]} title="Use" ></Button>
      </View>
    </Animatable.View>
  )

}

export default function HomeScreen() {
  
  const [coupons,setCoupons] = useState([])
  const [selectedCoupons,setSelectedCoupons] = useState()
  const [xd,setXd] = useState()
  
  let acount = 1
  
  useEffect(()=>{
    axios.post("acount/getCodes",{"id":acount}).then(r=>{
      let couponss = []
      r.data.forEach(element => {
        couponss.push(<Button onPress={()=>{setSelectedCoupons(<Info use={()=>{
          axios.post("acount/useCode",{"acountId":acount,"codeId":element.id}).then(er=>{
            setXd("asd")
          })
        }} coupon={element} ></Info>)}} title={element.code} ></Button>)
      });
      setCoupons(couponss)
    })

  },[xd])

  return (
    <SafeAreaView style={[t.p10,t.bgGray900]} >
      <Text>HomeScreen1</Text>
      <Button onPress={()=>{alert("uses "+ props.coupon.code);props.use()}} style={[t.bgGray200,t.p4]} title="Logga in" ></Button>

      <View  >
        <View style={[t.flex,t.flexCol,t.flex]} >
        {coupons}

        </View>
        {selectedCoupons}
      </View>
    </SafeAreaView>
  )
}