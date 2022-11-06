import React from "react";
import { TextInputComponent } from "react-native";
import { View, Text } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import MainView from "../../Components/MainView";
import TextInputField from "../../Components/TextInputField";

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {t} from "react-native-tailwindcss"

export default function CouponsPage(props){


    return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"},t.p5]} >
            <View style={[t.flex,t.flexRow,t.justifyBetween,t.mB24]} >
                <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                <Text style={[t.textWhite,t.text2xl]} >Alla Erbjudanden</Text>
            </View>
            <View>
                <TextInputField style={[t.roundedFull]} placeholder="Sök" icon={<Ionicons style={{transform:[{scaleX:-1}]}} name="search-outline" size={24} color="light-gray" />} ></TextInputField>
            </View>
        </SafeAreaView>
    )
}