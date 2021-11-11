import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function StyleExample() {

    return (
        <View style={styles.container}>
            <Text style={styles.bigBlue}>Big blue text in react native</Text>
            <Text style={ styles.red}>Small red text in react native</Text>
        </View>
          );
}

//Styles within the component can be defined here:
const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});