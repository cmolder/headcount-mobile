import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


const CodeInput = (props) => {

    const [text, setText] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Enter class code:</Text>
            <TextInput style={styles.input} 
                       autoCapitalize={'characters'}
                       autoCorrect={false}
                       maxLength={6} 
                       placeholderTextColor='#ffcc33' 
                       placeholder='000000'
                       value={text}
                       onChangeText={value => {
                           setText(value.toUpperCase());
                           props.onChange(value);
                       }}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingTop: 10,

        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffcc33'
    }, 
    input: {
        height: 80,
        marginTop: 10,
        width: '75%',

        fontSize: 40,
        color: '#ffcc33',
        textAlign: 'center',
        fontFamily: 'Menlo', // TODO does this work on Android?
        letterSpacing: 5,
        
        
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#ffcc33'
    }
});

export default CodeInput;