import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { LocationSr } from "./screens";
import ChatBotSr from "./screens/ChatBotSr";
import Profile from "./screens/Profile";
import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { lazy, Suspense } from 'react';
import Home from "./screens/Home";
import Infor from "./screens/Infor";
const Stack = createNativeStackNavigator();


export default function App() {
  const Tab = createBottomTabNavigator();

  function MainNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 70,
            borderTopStartRadius: 18,
            borderTopEndRadius: 18
          }
        }}>
        <Tab.Screen
          name="Location"
          component={LocationSr}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image style={{ height: 30, width: 30 }} source={require('./assets/location.png')} />
            )
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image style={{ height: 30, width: 30 }} source={require('./assets/home22.png')} />
            )
          }}
          
        />
        <Tab.Screen
          name="ChatBot"
          component={ChatBotSr}
          options={{
            headerShown: false,
            tabBarIcon: ({ }) => (
              <Image style={{ height: 45, width: 45 }} source={require('./assets/chatbot.png')} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image style={{ height: 30, width: 30 }} source={require('./assets/profile.png')} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />       
         <Stack.Screen
        name="Infor"
        component={Infor}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
