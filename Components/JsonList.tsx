import React from 'react';
import { Text, View, FlatList, Button, Pressable } from 'react-native';
import styles from '../styles';


export default function JsonList() {

    //Variables
    const [jsonData, setJsonData] = React.useState();

    //Get JSONdata from jsonplaceholder and save it to variable
    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((responseData) => {
                setJsonData(responseData);
                //console.log(responseData); //dev
            })
    }

    return (
        <View>

            <Text style={{ fontSize: 24, textAlign: 'center' }}>This Example is using</Text>
            <Text style={{ textAlign: 'center' }}>https://jsonplaceholder.typicode.com/todos </Text>

            <View style={{ width: '100%', height: '680px' }}>

            <Button
                onPress={() => getData()}
                title="Load TODO"
                color="#556B2F"
            />

                <FlatList
                data={jsonData} //Flatlist data source
                keyExtractor={(item) => item.id.toString()} //Adding keys from source
                renderItem={({ item }) => ( //Rendering items....

                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgb(210, 230, 255)'
                                    : '#F0FFF0'
                            },
                        ]}>

                        {({ pressed }) => (
                            <View style={{ paddingLeft: '6px' }}>
                                <View style={styles.separatorLine}></View>
                                <Text style={{ fontSize: 16, }}>{pressed ? 'Object ID: ' + item.id.toString() : 'Press to get id'}</Text>
                                <Text style={styles.itemItalic}>UserId: {item.userId.toString()}</Text>
                                <Text style={styles.itemBolded}>Title: {item.title}</Text>
                                {/*<Text>Status: {item.completed.toString()}</Text>*/}
                                <Text style={styles.itemUnderlined}>{item.completed === true ? 'Status: Ready' : 'Status: In progress'}</Text>
                            </View>
                        )}
                    </Pressable>
                )}

            />
            </View>
            </View>


    );
}