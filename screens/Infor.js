import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  useState,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Infor = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{width: '100%', height: '20%', backgroundColor: '#FFB671'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              color: 'white',
              marginTop: '6%',
              marginLeft: 10,
            }}>
            {'<  '}Home
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style = {styles.text}>
        The product is a graduation thesis developed by Do Xuan Hieu. This is an
        IoT application that controls home devices combined with smart features
        such as weather information, AI chatbot, and alarms...
      </Text>

      <View style = {{flexDirection:'row',marginTop:60, justifyContent:'center'}} >
        <Image source={require('../assets/profile/email.png')} style = {styles.email}/>
        <Text style = {{alignSelf:'center', fontSize:20, fontWeight:'500',color: 'black'}}> : Dohieu825@gmail.com</Text>
      </View>
      <View style = {{flexDirection:'row',marginTop:20, justifyContent:'center'}} >
        <Image source={require('../assets/facebook_icon.png')} style = {styles.email}/>
        <Text style = {{alignSelf:'center', fontSize:20, fontWeight:'500',color: 'black'}}> : Đỗ Xuân Hiểu</Text>
      </View>
      <View style = {{flexDirection:'row',marginTop:20, justifyContent:'center'}} >
        <Image source={require('../assets/tiktok.png')} style = {styles.email}/>
        <Text style = {{alignSelf:'center', fontSize:20, fontWeight:'500',color: 'black'}}> : doxuanhieeur</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  version: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    marginTop:20
  },
  text:{
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Arial', // Font chữ
    color: '#333', // Màu chữ
    textAlign: 'center',
    marginTop:20,
    marginHorizontal:20
  },
  email:{
    height:30,
    width:30,
  }
});
export default Infor;
