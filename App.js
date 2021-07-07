import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Voice from '@react-native-voice/voice';



import {
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';





const Stack = createStackNavigator();


const App = () => {
  const [result,setResult] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);

    }
  }, []);
  const onSpeechStartHandler = (e) => {
    console.log("Start Handler",e);

  }
  const onSpeechEndHandler = (e) => {
    console.log("Stop handler");
  }
  const onSpeechResultsHandler = (e) => {
    let text=e.value[0];
    setResult(text);
    console.log("speech result", e);
  }
  const startRecording = async ()=>{
    try{
    await Voice.start('en-US')
  
    }catch(error){
      console.log("error",error)

    }
  }
  const stopRecording  = async ()=>{
    try{
      await Voice.stop()
      }catch(error){
        console.log("error",error)
  
      }
  }
  const HomeScreen = ({ navigation }) => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{paddingBottom: 30,}} >
          <Button title="Kushal" onPress={() => navigation.navigate("Voice")} />
        </View>
        <View style={{paddingBottom:20}}>
          <Button title="Mayank" onPress={() => navigation.navigate("Voice")} />
        </View>
      </View>
    )
  }
  
  const VoicePage = () => {
    return (
      <View >
        <Text style={{ alignSelf: "center", marginVertical: 24, fontWeight: "bold", fontSize: 25 }} >Interactive Testing</Text>
        <View style={styles.textinput}>
  
          <TextInput value={result}placeholder="Text" style={{ flex: 1 }} onChangeText= {text=>setResult(text)} />
          
        </View>
        <TouchableOpacity onPress={startRecording} style={{alignSelf:"center",marginTop:24 }}>
            <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/1082/1082810.png' }} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        <TouchableOpacity style ={{alignSelf:"center",marginTop:24, backgroundColor:"blue"}} onPress={stopRecording} >
          <Text style={{color:"white"}}> Stop </Text>
        </TouchableOpacity>
  
  
  
  
      </View>
    )
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GamePage" component={HomeScreen}  />
        <Stack.Screen name="Voice" component={VoicePage} />
      </Stack.Navigator>

    </NavigationContainer>
  );

}
const styles = StyleSheet.create({
  textinput: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 45,
    alignItems: "center",
    borderRadius: 20,
    shadowOffset :{width:0, height :1},
    shadowRadius :2,
    elevation: 2,
    shadowOpacity :0.4

  }
})


export default App;
