import React from "react";
import {View,Text,StyleSheet} from "react-native";
import TextAnimator from "./TextAnimator";

export default function Attach(props){
return (
  props.bol?
   <TextAnimator
        content={props.result1}
        textStyle={styles.textStyle}
        style={styles.containerStyle}
        duration={200}
        onFinish={props.fin}
        
      />
  : null
);

}
const styles= StyleSheet.create({
    containerStyle: {},
    textStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Menlo',
      marginBottom: 14
    }

})

