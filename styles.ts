import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //*************************************
    //Defaults
    container: {
        marginTop: 12,
        width: '80%',
    },
    flexLayout: {
        marginTop: 22,
        flex: 1,
    },
    siteHeight: {
        height: 960,
    },

    //**************************************
    //StyleExampleExternal.tsx
    bigOrange: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 22,
    },
    green: {
        color: 'green',
    },

    //**************************************
    //ScrollViewExample.tsx
    scrollView: {
        marginTop: 12,
        paddingLeft: 6,
    },
    scrollText: {
        fontSize: 12,
    },
    textButton: {
        backgroundColor: 'green',
    },

    //**************************************
    //JsonList.tsx
    itemItalic: {
        fontStyle: 'italic'
    },
    itemBolded: {
        fontWeight: 'bold',
    },
    itemUnderlined: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    separatorLine: {
        marginTop: 4,
        marginBottom: 4,
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },

    //**************************************
    //Home.tsx
    logoNative: {
        width: 230,
        height: 67,
        margin: 12,
    },

    navButton: {
        width: '80%',
        margin: 4,
    },
    menu: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default styles;