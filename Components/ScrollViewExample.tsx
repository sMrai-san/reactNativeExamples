import React from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';  //Expo vector icons https://icons.expo.fyi/
import LoremIpsumText from './LoremIpsumText';

export default function ScrollViewExample() {

    const [isVisibleAtStart, setIsVisibleAtStart] = React.useState(true);
    //Variable for lorem ipsum text (default value: false)
    const [shouldShow, setShouldShow] = React.useState(false);
    //Variable for icon change (default value: true)
    const [showIcon, setShowIcon] = React.useState(true);

    //onLongPress -function example
    const letItGo = () => {
        if (Platform.OS == 'web') {
            console.log("Pressing element for long.");
        }
        else if (Platform.OS == 'android') {
            console.warn('Pressing element for long.')

        }
    }

    //Change icons
    const showText = () => {
        setIsVisibleAtStart(!isVisibleAtStart)
        setShouldShow(!shouldShow);
        setShowIcon(!showIcon);
    }

    return (
        //View (will start to scroll on a specific height...)
        <View>
        <ScrollView
            style={styles.scrollView}
            persistentScrollbar={true}
            fadingEdgeLength={180}
        >
            {/*
             * Pressable -component documentation:
             * https://reactnative.dev/docs/pressable#how-it-works
             */}
            <Pressable
                onLongPress={() => letItGo()} //Pressing over 0.5 sec

                //https://reactnative.dev/docs/pressable#example
                //Changing styles on long press! (Documentation example)
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(210, 230, 255)'
                            : '#FF7F50',
                        marginBottom: 16,
                    },
                ]}
            >

                {({ pressed }) => (
                    <Text>
                        {pressed ? 'This text is now pressed' : 'Press over this text'}
                    </Text>
                )}

            </Pressable>




            <View style={{ flexDirection: 'row' }}>
                {/* Hide / Show text on iconclick using https://icons.expo.fyi */}
                {showIcon ? (<AntDesign name="circledowno" size={24} color="black" onPress={() => showText()} />) : <AntDesign name="upcircleo" size={24} color="black" onPress={() => showText()} />}  
            </View>

            {/* Lorem ipsum text: */}

            <Pressable
                onPress={() => { showText() }} //Hide / Show lorem ipsum
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(255, 222, 173)'
                            : 'transparent', //if no transparent defined here, top rgb will prevail after click
                    },
                ]}
            >
                {isVisibleAtStart ? (
                    <Text style={styles.scrollText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...
                    </Text>
                ) : null}
            </Pressable>


            {shouldShow ? (
                <Pressable
                    onPress={() => { showText() }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgb(255, 222, 173)'
                                : 'transparent' //if no transparent defined here, top rgb will prevail after click
                        },
                    ]}
                >
                    <Text style={styles.scrollText}>
                        <LoremIpsumText />
                    </Text>
                </Pressable>
            ) : null}


            </ScrollView>
            </View>

    );
}