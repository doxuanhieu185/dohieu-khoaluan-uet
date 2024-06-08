import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require('../assets/hieudeptrai.jpeg')}
          />
          <Text style={styles.name}>Do Xuan Hieu</Text>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={styles.frame3}>
          <TouchableOpacity style={[{flexDirection: 'row', height: 60}]}>
            <Image
              source={require('../assets/profile/person.png')}
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
                marginLeft: 20,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: 40,
                }}>
                Do Xuan Hieu
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'black',
                  marginLeft: 40,
                }}>
                Your name
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[{flexDirection: 'row', height: 60}]}>
            <Image
              source={require('../assets/profile/email.png')}
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
                marginLeft: 20,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: 40,
                }}>
                Dohieu825@gmail.com
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'black',
                  marginLeft: 40,
                }}>
                Your email
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[{flexDirection: 'row', height: 60}]}>
            <Image
              source={require('../assets/profile/phone.png')}
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
                marginLeft: 20,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: 40,
                }}>
                0334862379
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'black',
                  marginLeft: 40,
                }}>
                Your phone
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.frame1, {flexDirection: 'row'}]}>
          <Image
            source={require('../assets/profile/edit.png')}
            style={{height: 40, width: 40, alignSelf: 'center', marginLeft: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
                marginLeft: 40,
              }}>
              Edit profile
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: 'black',
                marginLeft: 40,
              }}>
              Edit information about you
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.frame2}>
          <Image
            source={require('../assets/profile/alarm.png')}
            style={{height: 40, width: 40, alignSelf: 'center', marginLeft: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
                marginLeft: 40,
              }}>
              Alarm
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: 'black',
                marginLeft: 40,
              }}>
              Send important notifications to you
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.frame2} onPress={() => navigation.navigate('ChatBot')}>
          <Image
            source={require('../assets/profile/chatbot.png')}
            style={{height: 40, width: 40, alignSelf: 'center', marginLeft: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
                marginLeft: 40,
              }}>
              Chatbot AI
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: 'black',
                marginLeft: 40,
              }}>
              Help you answer all your questions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.frame2,
            {borderBottomStartRadius: 18, borderBottomEndRadius: 18},
          ]}
          onPress={() => navigation.navigate('Infor')}
          >
          <Image
            source={require('../assets/profile/infor.png')}
            style={{height: 40, width: 40, alignSelf: 'center', marginLeft: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
                marginLeft: 40,
              }}>
              About us
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: 'black',
                marginLeft: 40,
              }}>
              Know more information about us
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  frame1: {
    width: '95%',
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderTopStartRadius: 18,
    borderTopEndRadius: 18,
    marginTop: 20,
  },
  frame2: {
    width: '95%',
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 1,
    flexDirection: 'row',
  },
  frame3: {
    width: '95%',
    height: 180,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 18,
    marginTop: 20,
  },
});
