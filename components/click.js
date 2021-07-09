import React from 'react';
import { Image } from "react-native";
import Pulse from "react-native-pulse";

function Click(props){
    return (
        props.boo?
       <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/1082/1082810.png' }} style={{ width: 25, height: 25 }} />

    :<Pulse color='blue' numPulses={5} diameter={300} speed={2} duration={1000} />
    
    );
}


export default Click;