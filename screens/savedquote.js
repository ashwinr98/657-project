import {
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button
  } from "react-native";
  import React, { useState, useEffect } from "react";

  export default function SavedQuote() {
    const [savd, setSaved] = useState("")
    const api_url = "https://semproject-9a86b-default-rtdb.firebaseio.com/quotes.json"

    async function getapi(url)
    {
    const response = await fetch(url);
    var data = await response.json();
    // console.log(data);
    var newArrayDataOfOjbect = Object.values(data)
    // console.log('array', newArrayDataOfOjbect)
    setSaved(...savd, newArrayDataOfOjbect)
    }
    // console.log("sample",itms)
    console.log("saved",savd)

    useEffect(() => {
        getapi(api_url)    
      }, []);

    FlatListItemSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
            }}
        />
        );
    };

    return(
        <View>
    <FlatList

      keyExtractor={(item) => item.auth}
      data={savd}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={({ index, item }) => {
        return (
            <View>
        <Text>
            Quote: {item.qt}
        </Text>
        <Text>
                Author: {item.auth}
        </Text>
        </View>
        );
      }}

    />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
  pointStyle: {
    color: "#000",
    fontSize: 24,
  },
  dateStyle: {
    fontStyle: "italic",
    fontSize: 10,
    alignSelf: "flex-end",
  },
});