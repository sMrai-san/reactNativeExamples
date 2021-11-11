import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles'; //Using external styles

export default function StyleExampleExternal() {

    return (
        <View style={styles.container}> 
            <Text style={styles.bigOrange}>This big orange text is from external style file</Text>
            <Text style={styles.green}>This smaller green text is from external style file</Text>
        </View>
    );
}