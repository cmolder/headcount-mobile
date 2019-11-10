import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';

class Location extends Component{
   state = {
       latitude: null,
       longitude: null
   };
   findCurrentLocation = () => {
       navigator.geolocation.getCurrentPosition(
            position =>{
               const latitude = JSON.stringify(position.coords.latitude);
               const longitude = JSON.stringify(position.coords.longitude);
            this.setState({latitude, longitude});
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
       );
    };        

render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.findCurrentLocation}>      
                <Text style={styles.text}> Where am I? </Text>
                <Text style={styles.text}> {this.state.latitude} </Text>
                <Text style={styles.text}> {this.state.longitude} </Text>
            </TouchableOpacity>            
	    </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
            alignItems: 'center',
            justifyContent: 'center',
    },
    text: {
        color: '#ffcc33',
        fontSize: 24,
        fontWeight: '900'
    }
});

export default Location;