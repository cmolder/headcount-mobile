import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


const CodeInput = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Enter class code:</Text>
            <TextInput style={styles.input} placeholder='000000'></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
    },
    text: {
        color: '#f3f3f3',
        fontSize: 24,
        fontWeight: '900'
    }, 
    input: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 10,
        width: '60%',
        height: 80,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#888'
    }
});

export default CodeInput;