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
import InputField from './Components/InputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
  const [acount,setAcount] = useState(null)
  
  
  useEffect(()=>{
    if(acount != null){
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
    }
    

  },[xd,acount])

  return (
    <SafeAreaView style={[t.p10,t.bgGray900]} >

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

      <View  >
        <View style={[t.flex,t.flexCol,t.flex]} >
        {coupons}

        </View>
        {selectedCoupons}
      </View>
    </SafeAreaView>
  )
}