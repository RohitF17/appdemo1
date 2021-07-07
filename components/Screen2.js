import React, {Component} from 'react';
import {View,Text,Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

 const HomeScreen = ({ navigation }) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{}} >
        <Button title="Game1" onPress={() => navigation.navigate("Voice")} />
      </View>
      <View style={{}}>
        <Button title="Game2" onPress={() => navigation.navigate("Voice")} />
      </View>
    </View>
  )
}

const VoicePage = () => {
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


const Stack = createStackNavigator();


const App = ({props}) => {
  const [result,setResult] = useState("")

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler.bind();
    Voice.onSpeechEnd = onSpeechEndHandler.bind();
    Voice.onSpeechResults = onSpeechResultsHandler.bind();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);

    }
  }, [])
  const onSpeechStartHandler = (e) => {
    console.log("Start Handler");

  }
  const onSpeechEndHandler = (e) => {
    console.log("Stop handler");
  }
  const onSpeechResultsHandler = (e) => {
    console.log("speech result", e);
  }
  const startRecording =async ()=>{
    try{
    await Voice.start('en-Us')
    }catch(error){
      console.log("error",error)

    }
  }
  const  stopRecording  =async ()=>{
    try{
      await Voice.stop()
      }catch(error){
        console.log("error",error)
  
      }
  }