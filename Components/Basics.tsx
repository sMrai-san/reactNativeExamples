import React from 'react';
import { Text, View } from 'react-native';
import HelloInput from './HelloWorldInput';
import StyleExample from './StyleExample';
import StyleExampleExt from './StyleExampleExternal';
import ScrollViewExample from './ScrollViewExample';


export default function HelloWorld() {
    return (
        <View style={{ width: '60%', alignSelf: 'center' }}>

            <View>
                <Text><h2>Basics</h2></Text>
            </View>

        <View>
            {/* Text component usage */}
            <Text>Terve Porvoo!</Text>

            {/* Basic input hello world */}
            <HelloInput />

            {/* Basic style */}
            <StyleExample />

            {/* External style */}
            <StyleExampleExt />

                {/* External style */}
                <ScrollViewExample />
            </View>
            </View>
    );
}