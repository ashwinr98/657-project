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
    console.log(data);
    setSaved(data)
    }
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
<FlatList
      style={styles.screen}
      keyExtractor={(item) => `${item.qt}`}
      data={savd}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={({ index, item }) => {
        // var dt = new Date(item.timestamp);
        return (
 
            <View style={styles.container}>
              <Text style={styles.pointStyle}>
                {" "}
                Start: {`${item.qt}`}{" "}
              </Text>
              {/* <Text style={styles.pointStyle}>
                {" "}
                End: {`${item.p2.lat}, ${item.p2.lon}`}{" "}
              </Text>
              <Text style={styles.dateStyle}> {dt.toString()} </Text> */}
            </View>
        );
      }}
    />
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