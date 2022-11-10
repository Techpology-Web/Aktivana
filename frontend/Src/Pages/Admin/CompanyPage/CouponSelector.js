import { BackHandler, Dimensions, FlatList, ImageBackground, ScrollView, TextInputComponent, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {t} from "react-native-tailwindcss";
import * as ImagePicker from 'expo-image-picker';
import { View, Text } from "react-native-animatable";
import axios from "axios";
import * as Animatable from 'react-native-animatable';
import Button from "../../../Components/Button";

function Coupon(props){
    const [selected,setSelected] = useState(props.selected)

	return (
		<Animatable.View animation={"bounceIn"} style={[{ transform:[{scale:2}], marginHorizontal:3},t.mB3,]} >
            <TouchableOpacity onPress={()=>{props.onPress(!selected);setSelected(!selected)}} style={[t.justifyCenter,t.p2,t.itemsCenter,{transform:[{scale: (selected)? 0.9 : 1}],backgroundColor:(selected)?"#009900":"#2A2A2A",width:110,height:110, borderRadius:25}]} >
				<Text style={[t.textLg, t.fontLight,t.textWhite,t.textCenter]}>{props.code}</Text>
			</TouchableOpacity>
		</Animatable.View>
	);
}

export default function CouponSelector(props){
	const [coupons,setCoupons] = useState([])
	const [selectedCoupons,setSelectedCoupons] = useState((props.selected)?JSON.parse(props.selected):[])
	const [searchWord,setSearchWord] = useState("")


    const inside = (item) =>{
        
        for(let i = 0;i<selectedCoupons.length;i++){
            if(selectedCoupons[i].id === item.id ) return true
        }
    
    }

    const fetchCompanys = () =>{
        axios.post("code/get/").then(r=>{
            setCoupons(r.data)
        }).catch(error=>{
            alert(error.response.data)
        });
    }
    
	useEffect(()=>{
        fetchCompanys()
        BackHandler.addEventListener('hardwareBackPress', function () {
            props.done(props.selected)
            return true
        });
    },[])

    return (
        <View style={[{width:"100%",height:"100%",backgroundColor:"#1E1E1E"},t.p2]} >
            <Text style={[t.textWhite,t.text2xl, t.textCenter,t.mY12]} >Välj vilka rabatter som detta företag ska ha tillgång till {selectedCoupons.length}</Text>
                <FlatList
                    scrollEnabled={true}
                    numColumns={3}
                    extraData={selectedCoupons}
                    data={coupons}
                    renderItem={({item, index}) => (    
                        <Coupon key={index} selected={inside(item)} count={index} onPress={(e)=>{
                            
                            let selected = selectedCoupons;
                            if(e)
                                selected.push(item)
                            else
                                selected.splice(selected[item], 1);
                            setSelectedCoupons(selected)
                            
                        }} code={item.code} /> 
                    )
                    }
                />
            
            <Button onPress={()=>{props.done(JSON.stringify(selectedCoupons))}} >Lägg till</Button>
            <Button onPress={()=>{props.done(props.selected)}} >Avbryt</Button>
        </View>
    )
}