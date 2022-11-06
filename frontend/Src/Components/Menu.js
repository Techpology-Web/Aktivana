


export default function Menu(props){

    const [show,setShow] = useState(false)
	const [slide,setSlide] = useState("slideOutLeft")

    setSlide((show)?"slideInLeft":"slideOutLeft")

	let ScreenHeight = Dimensions.get("window").height+20;

    return (
        <Animatable.View animation={slide} style={[t.flex,t.justifyCenter,t.itemsCenter,t.bgBlack,t.flex1,t.absolute,{width:"25%",height:ScreenHeight}]} >
        	<Text style={[t.textWhite,t.text6xl]} >Hello</Text>
      	</Animatable.View>
    )

}