import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const PresentButton = (props) => {
    return(
        <View style={styles.button}>
            <TouchableOpacity onPress={() => props.onPress()}>      
                <Text style={styles.text}>Mark present</Text>
            </TouchableOpacity>            
	    </View>
 
     
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        
        height: 50,
        width: '90%',

        borderRadius: 10,
        backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '800'
    }
});

export default PresentButton;
