import React from 'react';
import { View, Button, Image, Pressable, Platform } from 'react-native';
import styles from './styles';

export default function Home({ navigation }: { navigation: any }) {

    //Onhover (browser only)
    function changeBackground(e: any) {
        e.target.style.opacity = 0.6;
        e.target.style.background = 'rgba(33, 120, 243)';
    }

    //UnOnhover (browser only)
    function changeBackgroundToNormal(e: any) {
        e.target.style.background = 'rgb(33, 150, 243)';
        e.target.style.opacity = 1;
    }

    //If desktop web-browser calls
    if (Platform.OS === 'web') {
        return (
            <View style={styles.siteHeight}>
                {/* Tuodaan kuva sivulle */}
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={styles.logoNative}
                        source={require('./Content/logoNative.png')}
                    />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <div style={{ width: '80%', margin: '4px' }} onMouseOver={changeBackground} onMouseLeave={changeBackgroundToNormal}>
                        <Button
                            title="Basics"
                            onPress={() =>
                                navigation.navigate('Basics')
                            }
                        />
                    </div>

                    <div style={{ width: '80%', margin: '4px' }} onMouseOver={changeBackground} onMouseLeave={changeBackgroundToNormal}>

                        <Button
                            title="Northwind Inventory"
                            onPress={() =>
                                navigation.navigate('Inventory')
                            }
                        />
                    </div>

                    <div style={{ width: '80%', margin: '4px' }} onMouseOver={changeBackground} onMouseLeave={changeBackgroundToNormal}>
                        <Button
                            title="Login"
                            onPress={() =>
                                navigation.navigate('LoginScreen')
                            }
                        />
                    </div>

                    <div style={{ width: '80%', margin: '4px' }} onMouseOver={changeBackground} onMouseLeave={changeBackgroundToNormal}>
                        <Button
                            title="JsonList"
                            onPress={() =>
                                navigation.navigate('JsonList')
                            }
                        />
                    </div>

                    <div style={{ width: '80%', margin: '4px' }} onMouseOver={changeBackground} onMouseLeave={changeBackgroundToNormal}>
                        <Button
                            title="YleUutiset"
                            onPress={() =>
                                navigation.navigate('YleUutiset')
                            }
                        />
                    </div>
                </View>
            </View>
        );
    }

    //If the call is from any other than desktop web-browser
    else {
        return (

            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={styles.logoNative}
                        source={{
                            uri: './Content/logoNative.png',
                        }}
                    />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <Pressable
                        style={styles.navButton}
                    >
                        <Button
                            title="Basics"
                            onPress={() =>
                                navigation.navigate('Basics')
                            }
                        />
                    </Pressable>

                    <Pressable
                        style={styles.navButton}
                    >
                        <Button
                            title="Northwind Inventory"
                            onPress={() =>
                                navigation.navigate('Inventory')
                            }
                        />
                    </Pressable>

                    <Pressable
                        style={styles.navButton}
                    >
                        <Button
                            title="HelloWorldInput"
                            onPress={() =>
                                navigation.navigate('HelloWorldInput')
                            }
                        />

                    </Pressable>

                    <Pressable
                        style={styles.navButton}
                    >
                        <Button
                            title="JsonList"
                            onPress={() =>
                                navigation.navigate('JsonList')
                            }
                        />
                    </Pressable>

                    <Pressable
                        style={styles.navButton}
                    >
                        <Button
                            title="YleUutiset"
                            onPress={() =>
                                navigation.navigate('YleUutiset')
                            }
                        />
                    </Pressable>
                </View>

            </View>

        );
    }
}
