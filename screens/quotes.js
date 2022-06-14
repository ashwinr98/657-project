import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { initQuoteDB, storeQuoteItem } from "../helpers/fb-helper";
export default function Quotes({route, navigation}){
  
  useEffect(() => {
    try {
      initQuoteDB();
    } catch (err) {
      console.log(err);
    }

  }, []);

    
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("SavedQuote")}>
          <Text style={styles.headerButton}> Saved </Text>
        </TouchableOpacity>
      ),
    });
  });
    const [quote, setQuote] = useState({
        qt: "",
        auth: ""
    });
    console.log("jk",quote)
    const api_url = "https://zenquotes.io/api/random"
    async function getapi(url)
    {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data[0].q);
    setQuote({qt:data[0].q, auth:data[0].a})
    }

    // getapi(api_url);
    function saveqt(){

    }
    return(
      
      <View>
        <View>
        <Text style={{color:'red', fontSize:40, fontStyle:'italic'}}> {quote.qt}</Text>        
         <View>
        <Text style={{color:'red', fontSize:20, textAlign:'center'}}> {'-'+quote.auth}</Text> 
        </View>
        </View> 
        <View style={{padding:10}}>
      <Button
      style={styles.buttons}
      color='#8B8000'
      title="Get Quote"
      onPress={() => getapi(api_url)}
        />
        </View>
        <View style={{padding:10}}>

    <Button
      style={styles.buttons}
      color='#8B8000'
      title="Save Quote"
      onPress={() => storeQuoteItem(quote)}
        />
        
        </View>
    </View>
    );
    
}
const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: "#E8EAF6",
      flex: 1,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
    headerButton: {
      color: "#fff",
      fontWeight: "bold",
      margin: 10,
    },
    buttons: {
      padding: 10,
      
    },
    inputError: {
      color: "red",
    },
    input: {
      padding: 10,
    },
    resultsGrid: {
      borderColor: "#000",
      borderWidth: 1,
    },
    resultsRow: {
      flexDirection: "row",
      borderColor: "#000",
      borderBottomWidth: 1,
    },
    resultsLabelContainer: {
      borderRightWidth: 1,
      borderRightColor: "#000",
      flex: 1,
    },
    resultsLabelText: {
      fontWeight: "bold",
      fontSize: 20,
      padding: 10,
    },
    resultsValueText: {
      fontWeight: "bold",
      fontSize: 20,
      flex: 1,
      padding: 10,
    },
  });
  