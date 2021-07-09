import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Voice from '@react-native-voice/voice';
import Click from './components/click';
import Attach from './components/Attach';
import axios from 'axios';
import Sound from 'react-native-sound';

import {
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Alert,

} from 'react-native';





const Stack = createStackNavigator();


const App = () => {
  const [result, setResult] = useState('')
  const [click, setClick] = useState(true)
  const [game1, setGame] = useState('kushal')
 

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);

    }
  }, []);
  const onSpeechStartHandler = (e) => {

    console.log("Start Handler", e);
   


  }
  const onSpeechEndHandler = (e) => {
    setClick(true);
    console.log("Stop handler");

  }
  const onSpeechResultsHandler = (e) => {
    let message = e.value[0];
    setResult(message);
    console.log("speech result", e);

    let userGame=game1;

    let bodyForBackend = {
      "sid": "tempSid",
      "message": message,
      "game": userGame
    }
    const url = 'https://cmbki9zfng.execute-api.us-east-1.amazonaws.com/prod/';
    let linkToAudio = "";

    axios.post(url, bodyForBackend)
      .then(response => {
        linkToAudio = response.data.text;
        console.log(linkToAudio);
        const track = new Sound(linkToAudio, null, (e) => {
          if (e) {
            console.log('error loading track', e)
          }
          else {
            track.play()
          }
        })

      }).catch(error => {
        console.log(error)
      });




  }
  const startRecording = async () => {

    try {
      await Voice.start('en-US', {
        "RECOGNIZER_ENGINE": "GOOGLE",
        "EXTRA_PARTIAL_RESULTS": true
      })

    } catch (error) {
      console.log("error", error)

    }
  }
  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error", error)

    }
  }


  const HomeScreen = ({ navigation }) => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{ paddingBottom: 30, }} >
          <Button title="Kushal" onPress={() => {
            navigation.navigate("Voice")
            setGame("kushal")
            console.log(game1)
            setResult('');
            setClick(true);
          }} />
        </View>
        <View style={{ paddingBottom: 20 }}>
          <Button title="Mayank" onPress={() => {

            navigation.navigate("Voice")
            setGame("mayank")
             console.log(game1)
            setResult('');
            setClick(true);
          }} />
        </View>
      </View>
    )
  }

  const VoicePage = ({navigation}) => {
    return (

      <View >
        <Text style={{ alignSelf: "center", marginVertical: 24, fontWeight: "bold", fontSize: 25 }} >Interactive Testing</Text>
        <View >


          <Attach bol={click} result1={result} />

        </View>

        <TouchableOpacity onPress={() => {
          startRecording()
          setClick(false);


        }} style={{ alignSelf: "center", marginTop: 24 }}>

          <Click boo={click} />
        </TouchableOpacity>
      </View>
    );
  }
  const VoicePage2 = () => {
    return (

      <View >
        <Text style={{ alignSelf: "center", marginVertical: 24, fontWeight: "bold", fontSize: 25 }} >Interactive Testing</Text>
        <View >


          <Attach bol={click} result1={result} />

        </View>

        <TouchableOpacity onPress={() => {
          startRecording()
          setClick(false);


        }} style={{ alignSelf: "center", marginTop: 24 }}>

          <Click boo={click} />
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GamePage" component={HomeScreen} />
        <Stack.Screen name="Voice" component={VoicePage} />
        {/* <Stack.Screen name="Voice2" component={VoicePage2} /> */}
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
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4

  }
  
  
})



export default App;
