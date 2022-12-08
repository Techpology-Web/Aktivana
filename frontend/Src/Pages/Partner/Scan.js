import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import {t} from "react-native-tailwindcss";
import Menu from "../../Components/Menu";
import InputField from "../../Components/InputField";
import TextInputField from "../../Components/TextInputField";
import Button from "../../Components/Button";
import { useState } from "react";
import axios from "axios";

export default function Scan(props){
    const [coupon, setCoupon] = useState("")
    const [account, setAccount] = useState("")

    const use = () =>{
        axios.post("account/useCode/",{
            "codeId":coupon,
            "accountId":account,
        }).then(r=>{

        })
    }

    return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]} >
                <Menu
                    navigation={props.navigation} 
                    paths={[
                    ]}
                />
                <Text style={[t.textWhite]} >Scanner</Text>
                <View style={{display:"flex"}} >
                    <TextInputField onChangeText={setCoupon} placeholder="coupon id" ></TextInputField>
                    <TextInputField onChangeText={setAccount} placeholder="account id" ></TextInputField>
                    <Button onPress={use} >Use</Button>
                </View>
            </View>
       </SafeAreaView>
        )
}
