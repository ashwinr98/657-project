import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    StyleSheet,
    Image
  } from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { initQuoteDB, createUserAccount } from "../helpers/fb-helper";
import {  Input } from "react-native-elements";

export default function CreateAccount({route, navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [emailErrMsg,setEmailErrMsg] = useState("");
    const [pwdErrMsg,setPwdErrMsg] = useState("");
    const [confirmPwdErrMsg,setConfirmPwdErrMsg] = useState("");
    const [displaySuccessMsg, setDisplaySuccessMsg] = useState("");
    const [displayErrorMsg, setDisplayErrorMsg] = useState("");
    const [existingUsers, setExistingUsers] = useState([])
    const api_url = "https://semproject-9a86b-default-rtdb.firebaseio.com/users.json"
    const initialField = useRef(null);

    useEffect(() => {
        getExistingUsersData(api_url)    
    },[]);

    async function getExistingUsersData(url)
    {
        const response = await fetch(url);
        var data = await response.json();
        //console.log(data);
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
    
    
    return(
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
            secureTextEntry={true}
            value={password}
            autoCorrect={false}
            errorStyle={styles.inputError}
            errorMessage={pwdErrMsg}
            onChangeText={(val) => setPassword(val)}
          />
          <Input
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            value={confirmpassword}
            autoCorrect={false}
            errorStyle={styles.inputError}
            errorMessage={confirmPwdErrMsg}
            onChangeText={(val) => setConfirmPassword(val)}
          />
          {renderSuccessMsg()}
          <Text style={styles.inputError}>{displayErrorMsg}</Text>
          {renderCreateAccountBtn()}
        </View>
      </TouchableWithoutFeedback>
      );

    function renderSuccessMsg() {
        if(displaySuccessMsg != '') {
            return(<View><Text style={styles.successMsg}>{displaySuccessMsg}</Text>
            <TouchableOpacity>
            <Text style={{color: 'blue'}} onPress={() => navigation.navigate("Login",{fromCreateAccountPageFlagParam:true})}>
             Go Back To Login Now</Text>
            </TouchableOpacity></View>);
        }
        else {
            return(<View></View>);
        }
    }
    function renderCreateAccountBtn() {
        if(displaySuccessMsg == '') {
            return(
            <View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => doValidate()}>
            <Text>Create Account</Text>
            </TouchableOpacity>
            </View>);
        } else {
            return(
                <View>
                </View>);
        }
    }
    
    function doValidate() {
        Keyboard.dismiss();
        let fieldsValidationFailed = false;
        if(email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
          setEmailErrMsg("Choose a valid email");
          setDisplayErrorMsg("")
          fieldsValidationFailed = true
        }
        else if(isEmailAlreadyExists()) {
            setEmailErrMsg("This email address already exists. Please choose a different email address.");
            setDisplayErrorMsg("")
            fieldsValidationFailed = true        
        }
        else {
            setEmailErrMsg("");
        }

        if(password == '') {
          setPwdErrMsg("Enter a password");
          setDisplayErrorMsg("")
          fieldsValidationFailed = true
        }
        else {
          setPwdErrMsg("");
        }

        if(confirmpassword == '') {
            setConfirmPwdErrMsg("confirm password");
            setDisplayErrorMsg("")
            fieldsValidationFailed = true
        }
        else {
            setConfirmPwdErrMsg("");
        }

        if(password != confirmpassword) {
            setPwdErrMsg("passwords dont match. please try again.");
            setConfirmPwdErrMsg("passwords dont match. please try again.");
            fieldsValidationFailed = true
        }

        if(!fieldsValidationFailed) {
            createUserAccount({email,password});
            setDisplaySuccessMsg("Account created successfully");
        }
      }

      function isEmailAlreadyExists() {
        for (var i=0; i < existingUsers.length; i++) {
            if(existingUsers[i].email == email) {
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
        successMsg: {
          color: "green"
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

