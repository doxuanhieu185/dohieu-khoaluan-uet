import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatBotSr = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [outputMessage, setOutputMessage] = useState();
  const sendMessage = async () => {
    const message ={
      _id: new Date().getTime().toString(),
      text: inputMessage,
      createAt: new Date(),
      user: {_id: 1}
    }

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage,[message] )
    )
    setInputMessage('');
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer API key`,
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: inputMessage}],
          temperature: 0.7,
        },
      });
      console.log(response.data.choices[0].message.content);
      const answerData = response.data.choices[0].message.content;
      setOutputMessage(answerData.trim())
      const message ={
        _id: (new Date().getTime() + 1).toString(),
        text: answerData.trim(),
        createAt: new Date(),
        user: {_id: 2, name:'Hieu Bot'}
      }
  
      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage,[message] )
      )
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleTextInput = text => {
    setInputMessage(text);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          source={require('../assets/logoChatbot.png')}
          style={{
            height: 120,
            width: 120,
            alignSelf: 'center',
            marginTop: '10%',
          }}
        />
        
        <GiftedChat messages={messages} renderInputToolbar={() => {}} user={{_id:1}} minInputToolbarHeight={0}></GiftedChat>
      </View>

      <View style={styles.frame}>
        <TextInput
          style={styles.input}
          placeholder="Your question"
          placeholderTextColor="black"
          keyboardType="default"
          onChangeText={handleTextInput}
          value={inputMessage}
          
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{alignSelf: 'center', marginLeft: 25}}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/send.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    height: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    opacity: 0.8,
  },
  input: {
    padding: 10,
    width: '85%',
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    height:50
  },
  welcomeFrame: {
    alignSelf: 'flex-start',
    marginTop: 30,
    flexDirection: 'row',
  },
  textWelComeFrame: {
    height: 50,
    width: 210,
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
  },
});
export default ChatBotSr;
