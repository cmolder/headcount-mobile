import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return(
        <View style={styles.header}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        
        backgroundColor: '#ffcc33',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 25,
        fontWeight: '800'
    }
});

export default Header;