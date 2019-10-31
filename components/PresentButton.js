import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const PresentButton = (props) => {
    return(
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Mark as present</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0,

        margin: 10,
        height: 60,

        borderRadius: 10,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#f3f3f3',
        fontSize: 28,
        fontWeight: '900'
    }
});

export default PresentButton;
