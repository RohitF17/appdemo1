import React, {Component} from 'react';
import {View,Button,Text} from 'react-native';


 
  const VoicePage = (props) => {
    return (
      <View >
        <Text style={{ alignSelf: "center", marginVertical: 24, fontWeight: "bold", fontSize: 25 }} >Interactive Testing</Text>
        <View style={styles.textinput}>
  
          <TextInput value={App.result} placeholder="Text" style={{ flex: 1 }} onChangeText={text=>props.setResult(text)} />
          
        </View>
        <TouchableOpacity onPress={props.startRecording} style={{alignSelf:"center",marginTop:24 }}>
            <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/1082/1082810.png' }} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        <TouchableOpacity style ={{alignSelf:"center",marginTop:24 }} >
          <Text> Stop </Text>
        </TouchableOpacity>
  
  
  
  
      </View>
    )
  }
export default VoicePage;





