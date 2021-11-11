import React from 'react';
import {Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function HelloWorldInput() {

    //HOOKS -variables
    const [name, setName] = React.useState('');
    const [shouldShow, setShouldShow] = React.useState(false);

    //Array varuabke for strings
    const [array, setArray] = React.useState<string[]>([]);

    //Add and show names
    const showName = (name: string) => {
        //alert('Terve ' + name); //Dev
        setShouldShow(!shouldShow); //Show / Hide element
        setArray(array => [...array, '\n' + name]);  //Add string to array
    }


    return (
        <View style={{ width: '60%', alignSelf: 'center', flex: 1 }}>

            {/* TextInput header */}
            <View style={{ width: '100%', alignContent: 'center', backgroundColor: '#FFF8DC', padding: 20, marginTop: 12, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>TextInput</Text>
            </View>


            {/* TextInput */}
            <View style={{ width: '100%', alignContent: 'center' }}>
                <Text>Name:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 2, paddingLeft: 6 }}
                    onChangeText={text => setName(text)}
                    value={name}
                />

                {/* Calling showName -function on button click */}
                <View style={{ marginTop: 6, }}>
                    <Button
                        title="Add name"
                        onPress={() => showName(name)}
                    />
                </View>

                {/* Clear list */}
                <View style={{ marginTop: 6, }}>
                    <Button
                        color={'#DC143C'}
                        title="Clear list"
                        onPress={() => setArray([])}
                     />
                </View>

                <View style={{ marginTop: 6, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 4, }}>Array contents:</Text>
                </View>

                <ScrollView style={{ width: 'auto' }} fadingEdgeLength={180}>
                    <Text>{array}</Text>
                </ScrollView>

            </View>

        </View>

    );
}