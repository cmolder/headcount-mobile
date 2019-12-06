import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginInfo = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>
                    Username
                </Text>
                <TextInput style={styles.inputField}
                           autoCapitalize={'none'}
                           autoCorrect={false}
                           maxLength={200}
                           onChangeText={(text) => setUsername(text)}>  
                </TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>
                    Password
                </Text>
                <TextInput style={styles.inputField}
                           secureTextEntry={true}
                           maxLength={200}
                           onChangeText={(text) => setPassword(text)}>
                </TextInput>
            </View>
            <TouchableOpacity style={styles.button}
                              onPress={() => props.onLogin(username, password)}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },

    inputTitle: {
        flex: 2,

        color: '#ffcc33',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Arial',
    },
    
    inputField: {
        flex: 3,

        height: 40,
        marginTop: 10,
        marginBottom: 10,

        color: '#ffcc33',
        fontSize: 18,
        fontFamily: 'Arial',
        
        textAlign: 'left',
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffcc33'
    },

    button: {
        flex: 0,

        marginTop: 30,
        height: 50,
        width: '90%',

        borderRadius: 10,
        backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '800'
    }
});

export default LoginInfo;