import { initQuoteDB } from "../helpers/fb-helper";
import React, { useState, useEffect, useRef } from "react";
import {  Input } from "react-native-elements";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
 
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg,setEmailErrMsg] = useState("");
  const [pwdErrMsg,setPwdErrMsg] = useState("");
  const [authFailedErrMsg,setAuthFailedErrMsg] = useState("");
  const initialField = useRef(null);
  const [existingUsers, setExistingUsers] = useState([])
  const api_url = "https://semproject-9a86b-default-rtdb.firebaseio.com/users.json"
  
  useEffect(() => {
    getExistingUsersData(api_url)    
  },[]);

  async function getExistingUsersData(url)
  {
      const response = await fetch(url);
      var data = await response.json();
      console.log(data);
      if(data != null && data != '') {
          var newArrayDataOfOjbect = Object.values(data)
          // console.log('array', newArrayDataOfOjbect)
          setExistingUsers(...existingUsers, newArrayDataOfOjbect)
      }
      else {
          setExistingUsers(...existingUsers, [])
      }
  }

  useEffect(() => {
      try {
        initQuoteDB();
      } catch (err) {
        console.log(err);
      }
    }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo.jpg")} />
        <Input
          style={styles.input}
          placeholder="Enter email"
          ref={initialField}
          value={email}
          autoCorrect={false}
          errorStyle={styles.inputError}
          errorMessage={emailErrMsg}
          onChangeText={(val) => setEmail(val)}
        />
        <Input
          style={styles.input}
          placeholder="Enter password"
          value={password}
          autoCorrect={false}
          errorStyle={styles.inputError}
          errorMessage={pwdErrMsg}
          onChangeText={(val) => setPassword(val)}
        />
        <Text style={styles.inputError}>{authFailedErrMsg}</Text>
        <View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => doValidateAndLogin()}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={{color: 'blue'}} onPress={() => {
                setEmail("");
                setPassword("");
                setAuthFailedErrMsg("");  
                navigation.navigate("Create Account");
            }}>
              Dont have an account? Click to create one!</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
  function doValidateAndLogin() {
    Keyboard.dismiss();
    let fieldsValidationFailed = false;
    if(email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setEmailErrMsg("Enter a valid email address");
      setAuthFailedErrMsg("")
      fieldsValidationFailed = true
    }
    else {
      setEmailErrMsg("");
    }
    if(password == '') {
      setPwdErrMsg("Enter password");
      setAuthFailedErrMsg("")
      fieldsValidationFailed = true
    }
    else {
      setPwdErrMsg("");
    }

    if(!fieldsValidationFailed) {
      if( !validateCredentials()) {
        setAuthFailedErrMsg("Invalid email or password. Please try again.")
      }
      else {
        navigation.navigate("Quote")
      }
    }
  }
  function validateCredentials() {
    //Force re-render of component by adding some random text to state variable
    //This is required to reload/fetch Users info from API before validating
    setAuthFailedErrMsg("Validating credentials..."+new Date().getTime())
    setAuthFailedErrMsg("")
    for (var i=0; i < existingUsers.length; i++) {
      if(existingUsers[i].email == email && existingUsers[i].password == password) {
          return true;
      }
    }
    return false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
 
  image: {
    marginBottom: 2,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
    margin: 10,
  },
  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#a4c936",
    color: "#fff",
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