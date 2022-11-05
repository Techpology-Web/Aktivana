import { View, Text } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';

export default function Std_Bg(props) {
	const _svg = '<svg width="393" height="852" viewBox="0 0 393 852" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-67.6604 388.57C-5.85186 451.195 111.21 525.302 140.244 617.64C169.278 709.978 134.799 825.488 113.93 871.7L-7.93761 893.424L-105.376 346.805C-117.39 330.529 -107.616 334.239 -107.616 334.239L-105.376 346.805C-99.426 354.866 -88.1321 367.828 -67.6604 388.57Z" fill="#68F900"/><path d="M498.39 194.247C424.468 153.21 310.549 130.5 243.116 39.0986C185.763 -38.6398 172.892 -155.532 173.626 -204.261L267.157 -258.261L544.775 222.587C560.62 234.376 551.157 233.642 551.157 233.642L544.775 222.587C536.928 216.749 522.874 207.839 498.39 194.247Z" fill="#68F900"/></svg>'

	const GetSvg = () => <SvgXml xml={_svg} width={props.width} height={props.height}/>;
	
	return <GetSvg />;
}