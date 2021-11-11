import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Platform, ScrollView, Pressable } from 'react-native';
import { API_id, API_key } from './APIk';

interface ITeletextResponse { //Typescript for YLE text-tv
    teletext: {
        network: string;
        xml: string;
        page: {
            number: string;
            name: string;
            time: string;
            subpagecount: string;
            nextpg: string;
            toptype: string;
            animated: string;
            subpage: Array<{
                number: string,
                time: string,
                content: Array<{
                    type: "text" | "all" | "structured";
                    line: Array<{
                        number: string;
                        Text: string;
                    }>
                }>
            }>
        }
    }
}

export default function YleUutiset() {

    const [newsPage, setNewsPage] = useState<string>('');
    const [news, setNews] = useState<string[]>([]);

    //Variable for API data:
    const [data, setData] = useState<string[]>([]);


    useEffect(() => { //more info how to use useEffect https://reactjs.org/docs/hooks-effect.html
        fetch('https://external.api.yle.fi/v1/teletext/pages/102.json?app_id=' + API_id + '&app_key=' + API_key)
            .then((response) => response.json())
            //.then((data) => console.log(data.teletext.page.subpage))
            .then((data: ITeletextResponse) => {
                //fetchData variable will have to be parsed from .json subpage
                //.filter only text
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                //.map the wanted text
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

                const fetchData = data.teletext.page.subpage[0].content.filter(c => c.type === "text").map(c => c.line.map(l => l.Text));
                const cleanData = fetchData[0].filter(row => !!row); //

                setData(cleanData); //save all data to const data -variable and handle undefined and nulls

                //console.log(removeEmpty(fetchData)); //dev
            })
            .catch((error) => console.error(error))
    }, []);


    useEffect(() => {
        if (newsPage === '') {
            console.log("Yle teksti-tv news v.0.1");
        }
        else {
            fetch('https://external.api.yle.fi/v1/teletext/pages/' + newsPage + '.json?app_id=' + API_id + '&app_key=' + API_key)
                .then((response) => response.json())
                .then((data: ITeletextResponse) => {
                    const fetchData = data.teletext.page.subpage[0].content.filter(c => c.type === "text").map(c => c.line.map(l => l.Text));
                    const cleanData = fetchData[0].filter(row => !!row); //
                    setNews(cleanData);
                })
                .catch((error) => console.error(error))
        }
    }, [newsPage]);

    //***************************************************************
    //Rendering the page
    //***************************************************************

    return (
        <View style={styles.container}>
                {/************* Page header *****************/}
                <Text style={styles.title}>Yle TekstiTV -uutiset beta</Text>

                {/************* Separator *****************/}
                <View style={styles.separator} />

            {/************* News *****************/}
            <ScrollView persistentScrollbar={true} style={styles.yleTextContainer}>
                <Text style={styles.yleNewsDetail}>
                    {news.slice(2).map(r => r.split("   ")
                        .join("")
                        .replace(".  ", ". ")
                        .replace("  ", " ")
                        .replace("- ", "")
                        .replace(" ", "")
                        .replace("-", ""))}
                </Text>
            </ScrollView>
                {/************* News headers FlatList *****************/}
                <View style={styles.newsContainer}>
                    <Text style={styles.yleNewsHeader}>Kotimaan uutiset</Text>
                        <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                            data={data}
                            keyExtractor={(key) => key.toString()} //Remember to define a key for all the items
                            renderItem={({ item }) =>
                                /*Scrapping for pagenumber. You can also use .json values for this!*/
                                <Text style={styles.yleNewsTitle} onPress={() => setNewsPage(item.substring(1, 4))}>
                                    {item} {/*First three numbers excluded for better frontend*/}
                                </Text>

                            }
                        />
                </View>

            <View style={ styles.separator } />
        </View>
    );
}

//***********************************
//YLE UutisApp Styles
//***********************************

const styles = StyleSheet.create({

    container: {
        flex: Platform.OS === 'android' ? 1 : undefined,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
    },
    separator: {
        marginTop: 4,
        marginBottom: 4,
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },
    yleTextContainer: {
        width: '66%',
        paddingBottom: 24,
        marginBottom: 24,
        alignSelf: 'center',
        backgroundColor: '#ccc',
        borderRadius: 3,
        padding: 4,

    },
    yleTextImage: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 320,
        resizeMode: 'contain',
    },
    yleNewsDetail: {
        fontSize: 16,
        padding: 4,
    },
    newsContainer: {
        alignItems: 'center',

    },
    yleNewsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        textShadowOffset: { width: 1, height: 1, },
        textShadowColor: '#D1D1D1',
        letterSpacing: 6,
    },
    yleNewsTitle: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2,
        marginTop: 4,
    },
    ylePageInputContainer: {
        alignItems: 'center',
    },


});
