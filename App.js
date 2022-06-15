import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/login";
import Quotes from "./screens/quotes";
import CreateAccount from "./screens/createAccount";
import SavedQuote from "./screens/savedquote";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navStyling}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name='Quote' component={Quotes}/>
        <Stack.Screen name='SavedQuote' component={SavedQuote}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const navStyling = {
  headerStyle: {
    backgroundColor: "#0065A4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    flex: 1,
  },
});