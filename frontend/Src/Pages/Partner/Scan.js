import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import {t} from "react-native-tailwindcss";
import Menu from "../../Components/Menu";

export default function Scan(props){

    return(
        <SafeAreaView style={[{backgroundColor:"#1E1E1E",height:"100%"}]} >
            <View style={[t.justifyBetween,{height:"100%"}]} >
                <Menu
                    navigation={props.navigation} 
                    paths={[
                    ]}
                />
                <Text style={[t.textWhite]} >Scanner</Text>
 
            </View>
       </SafeAreaView>
        )
}
