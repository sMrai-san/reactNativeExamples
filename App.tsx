import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; //Navigation component import
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5, AntDesign } from '@expo/vector-icons'; //Vector-icons import

//DIY Components import
import Basics from './Components/Basics';
import JsonList from './Components/JsonList';
import YleUutiset from './Components/YleAPI/YleUutiset';
import Home from './Home';
import Inventory from './Inventory/Inventory';
import LoginScreen from './Login/LoginScreen';
import { View } from 'react-native';

const vsTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(245, 245, 245)',
    },
};

export default function App() {

    const Tab = createMaterialTopTabNavigator(); //Swipe navi -variable

    const iconSize = 22; //Topnav icon size

    const [logged, setLogged] = useState(false);

    function logIn(userName: string, PassWord: string) {
        if (userName != null && PassWord != null) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
    }
    
    //Further DEV
    //if (logged === false) {
    //    return (
    //        <LoginScreen login={logIn} />
    //    );
    //}
    //else {

    return (
        <View>
            <NavigationContainer theme={vsTheme}>

                    {/* SWIPE -VIEW: https://reactnavigation.org/docs/material-top-tab-navigator/ */}
                    <Tab.Navigator
                        tabBarOptions={{
                            activeTintColor: '#ffffff', //Active link color
                            inactiveTintColor: '#000000',//Inactive link color
                            showLabel: false, //Navigation text show
                            labelStyle: { fontSize: 10 }, //Navigation text style
                            showIcon: true, //Icons on/off
                            //scrollEnabled: true, //Activate scroll when the page is overheight
                            indicatorStyle: { height: 4 }, //Navigation styles (height: 0 disables whole navigation)
                        style: { backgroundColor: '#fff', paddingTop: 40, }, //Tabbar styles
                        }}
                    >
                        {/*Frontpage with navigation*/}
                        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <FontAwesome5 name="home" color="#333" size={iconSize} /> }} />
                        <Tab.Screen name="Basics" component={Basics} options={{ tabBarIcon: () => <FontAwesome5 name="question-circle" color="#333" size={iconSize} /> }} />
                        <Tab.Screen name="Inventory" component={Inventory} options={{ tabBarIcon: () => <FontAwesome5 name="boxes" color="#333" size={iconSize} /> }} />
                        <Tab.Screen name="LoginScreen" component={LoginScreen} options={{ tabBarIcon: () => <AntDesign name="login" size={iconSize} /> }} />
                        <Tab.Screen name="JsonList" component={JsonList} options={{ tabBarIcon: () => <FontAwesome5 name="database" color="#333" size={iconSize} /> }} />
                        <Tab.Screen name="YleUutiset" component={YleUutiset} options={{ tabBarIcon: () => <FontAwesome5 name="newspaper" color="#333" size={iconSize} /> }} />

                    </Tab.Navigator>

                </NavigationContainer>

        </View>

        );
    }
/*}*/