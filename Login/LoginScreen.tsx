import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native'; //Tänne importteihin kaikki react-native -komponentit mitä käytetään.

interface ILogin {
    //Typescript -interface
    id: number;
    email: string;
    name: string;
}

export default function LoginScreen(props: any) {

    const [inputEmail, setInputEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<any>([]);
    const [userName, setUserName] = useState<string>("please log in");

    //**************************************************************************************
    //Logitietojen haku jsonplaceholder -palvelusta
    //**************************************************************************************
    function loginClick() {
        let uri = 'https://jsonplaceholder.typicode.com/users';
        fetch(uri)
            .then(response => response.json())
            .then((json: ILogin[]) => {
                var getUser = json.filter(x => x.email == inputEmail).filter(y => y.id.toString() == password);
                if (getUser.length != 0) {
                    console.log(getUser);
                    setUser(getUser);
                    setUserName(getUser[0].name);
                }
                else {
                    console.log('user/password mismatch!');
                }
                //props.login(getUser[0].email, getUser[0].id)
            });


    }

    return (

        <View style={loginStyles.container}>
            <Text style={loginStyles.logo}>Login</Text>
            <Text style={{ padding: '16px', fontSize: 20, fontWeight:'bold', color: 'white' }}>Hello {userName}</Text>
            <View style={loginStyles.inputView} >
                <TextInput
                    style={loginStyles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setInputEmail(text)} />
            </View>
            <View style={loginStyles.inputView} >
                <TextInput
                    secureTextEntry
                    style={loginStyles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(val) => setPassword(val)} />
            </View>
            <TouchableOpacity style={loginStyles.loginBtn} onPress={() => loginClick()}>
                <Text style={loginStyles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://jsonplaceholder.typicode.com/users')}>
                <Text style={{ padding: '16px', fontSize: 16, color: 'white' }}>Use email for username and id for password from: https://jsonplaceholder.typicode.com/users </Text>
            </TouchableOpacity>
            <Text style={{ padding: '16px', fontSize: 16, color: 'white' }}>Username: Sincere@april.biz | Password: 1</Text>
        </View>
    );
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#025959',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#04ADBF",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#F2E0C9",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        borderRadius: 1,
        color: "black",
        fontSize: 20,
        padding: 6,
    },
    loginBtn: {
        width: "40%",
        backgroundColor: "#A0A603",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});