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



const Login = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={styles.backgroundImage}>
        <Image
          style={styles.logo}
          source={require('../assets/logoImage.png')}></Image>

        <View style={styles.textFrameUserName}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../assets/login/person.png')}
          />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="default"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
          ></TextInput>
        </View>

        <View style={styles.textFrameUserName}>
          <Image
            style={{height: 35, width: 35, marginLeft:10, marginRight:5}}
            source={require('../assets/login/password_login_logo.png')}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            // value={password}
            // onChangeText={(text) => setPassword(text)}
            style={{flex: 1, fontSize: 18}}
          />
        </View>

        <TouchableOpacity
          style={styles.loginFrame}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>or login with</Text>
        <View style={styles.container}>
          <Image
            source={require('../assets/facebook_icon.png')}
            style={styles.iconLogo}
          />
          <Image
            source={require('../assets/google_icon.png')}
            style={styles.iconLogo}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flexDirection: 'column',
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 30,
    marginBottom: 20,
  },
  iconUser: {
    marginLeft: 10,
    marginRight: 20,
  },
  iconPassword: {
    marginLeft: 10,
    marginRight: 20,
  },
  textFrameUserName: {
    width: '80%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  loginFrame: {
    height: 40,
    width: 80,
    backgroundColor: '#31B7FF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  textLogin: {
    fontSize: 18,
    color: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    color:'black'
  },
  container: {
    marginTop: 25,
    flexDirection: 'row',
  },
  iconLogo: {
    height: 50,
    width: 50,
    margin: 14,
  },
});

export default Login;
