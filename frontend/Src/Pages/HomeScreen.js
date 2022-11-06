import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
	SafeAreaView,
} from 'react-native-safe-area-context';
import Button from '../Components/Button';
import {t} from "react-native-tailwindcss"
import TextInputField from '../Components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '../Components/InputField';
import MainView from '../Components/MainView';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function HomeScreen(props) {


  return (
   <MainView>
      <Animatable.View animation="fadeInUp" style={[t.flex,t.justifyCenter,t.itemsCenter]} >
        <View style={[]} >
          <Text style={[t.textWhite,t.text6xl]} >Hello</Text>
          <Text style={[t.textWhite,t.text4xl]} >{global.session["firstName"]}</Text>
        </View>
      </Animatable.View>
   </MainView>
  )
}