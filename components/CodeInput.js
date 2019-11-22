import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


const CodeInput = (props) => {

    const [text, setText] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Enter class code:</Text>
            <TextInput style={styles.input} 
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
        paddingTop: 10,
        alignItems: 'center',
    },
    text: {
        color: '#ffcc33',
        fontSize: 24,
        fontWeight: '900'
    }, 
    input: {
        color: '#ffcc33',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 10,
        width: '60%',
        height: 80,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#ffcc33'
    }
});

export default CodeInput;