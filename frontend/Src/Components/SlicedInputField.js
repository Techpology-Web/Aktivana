import { View, Text, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { t } from "react-native-tailwindcss"

export default function SlicedInputField() {

	const [currentIndex, setCurrentIndex] = useState(0)
	const [value, setValue] = useState("")
	
	const ref_inp1 = useRef();
	const ref_inp2 = useRef();
	const ref_inp3 = useRef();
	const ref_inp4 = useRef();

	const _inputComp = (x) =>
	{
		var z = x
		const runRef = () =>
		{
			if(z == 0)
			{
				ref_inp1.current.focus();
			}
			if(z == 1)
			{
				ref_inp2.current.focus();
			}
			if(z == 2)
			{
				ref_inp3.current.focus();
			}
			if(z == 3)
			{
				ref_inp4.current.focus();
			}
		}

		const setRef = () =>
		{
			if(z != 0)
			{
				if(z == 1)
				{
					return ref_inp1
				}
				if(z == 2)
				{
					return ref_inp2
				}
				if(z == 3)
				{
					return ref_inp3
				}
				if(z == 4)
				{
					return ref_inp4
				}
			}
		}

		var _val = value.charAt(x);

		return(
			<TextInput autoFocus={(currentIndex == x)? true : false} value={_val}
				onKeyPress={
					({nativeEvent})=>{
						if(nativeEvent.key === "Backspace")
						{
							var y = value;
							y = y.slice(0,value.length - 1);
							updateValue(-1);
							z -= 2
							setValue(y);
							runRef()
						}
					}
				}
				onChangeText={(e)=>{
					var y = value;
					y += e;
					updateValue(1);
					setValue(y);
					runRef()
				}}
				onSubmitEditing={()=>{}}
				ref={setRef()}
				style={[{width: 50, height:70}, t.roundedLg, t.bgWhite, t.mX4, t.textCenter, t.text2xl]} placeholder="_"
			/>
		)
	}

	const updateValue = (x) =>
	{
		setCurrentIndex(currentIndex + x);
	}

	const genInputFields = (i) =>
	{
		var arr = []

		for (let index = 0; index < i; index++) {
			arr.push(_inputComp(index))
		}

		return(
			<View style={[t.flexRow, t.wFull, t.justifyCenter, t.itemsCenter]}>
				{arr}
			</View>
		)
	}

	return (
		<View>
			<Text>SlicedInputField</Text>
			{genInputFields(5)}
		</View>
	)
}