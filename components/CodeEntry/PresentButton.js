import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const PresentButton = (props) => {
    return(
        <View style={styles.button}>
            <TouchableOpacity onPress={() => props.onPress()}>      
                <Text style={styles.text}>Mark as present</Text>
            </TouchableOpacity>            
	    </View>
 
     
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        width: '90%',
        height: 60,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffcc33',

        borderRadius: 10,
    },
    text: {
        color: '#000000',
        fontSize: 28,
        fontWeight: '900'
    }
});

export default PresentButton;
