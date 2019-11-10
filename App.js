import React, { Fragment, Component } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PresentButton from './components/PresentButton';
import Location from './components/Location';

export default class App extends Component {

	render(){

	
  	return (
   	<Fragment>

    	{/* Notch/top region for iOS, otherwise size 0 */}
      		<SafeAreaView style={styles.notch}>
        	<StatusBar barStyle="light-content"/>
      	</SafeAreaView>

       	{/* Remainder of app view, including home bar for iOS */}
		<SafeAreaView style={styles.bottom}>
			<Header text="Bee Here" />
			<CodeInput />
			<View style={{height: '100%', flex: 1}}/>
			<Location />
			<View style={{height: '100%', flex: 1}}/>
			<PresentButton />
		</SafeAreaView>
   
    </Fragment>
  );
}
}

const styles = StyleSheet.create({
	notch: {
	  flex: 0,
	  backgroundColor: '#171717',
	  paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0
	},
	bottom: {
	  flex: 1,
	  backgroundColor: '#000000'
	}
  });
