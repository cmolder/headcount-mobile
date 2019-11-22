import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


const StudentInfo = (props) => {


    return(

        <View style={styles.container}>
            <Text style={styles.text}>First Name:</Text>
            <TextInput style={styles.input} 
                       placeholderTextColor='#ffcc33'
                       maxLength = {20} 
                       placeholder= 'First Name'>
                       </TextInput>
            <Text style={styles.text}>Last Name:</Text>
            <TextInput style={styles.input} 
                       placeholderTextColor='#ffcc33'
                       maxLength = {30} 
                       placeholder= 'Last Name'>
                       </TextInput> 
            <Text style={styles.text}>Student ID:</Text>
            <TextInput style={styles.input} 
                       placeholderTextColor='#ffcc33'
                       maxLength = {9} 
                       placeholder= 'First Name'>
                       </TextInput>          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: '#ffcc33',
        fontSize: 20,
        fontWeight: '900'
    }, 
    input: {
        color: '#ffcc33',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: '60%',
        height: 60,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffcc33'
    }
});

export default StudentInfo;