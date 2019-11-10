import React, { Fragment, Component } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PresentButton from './components/PresentButton';
import LocationButton from './components/LocationButton';

const App = () => {

	let code = '00000';

	const onCodeInputChange = (value) => {
		code = value;
		console.log(code);
	}

	const onPresentPress = () => {
		alert("You have been marked present in class " + code);
	}

  	return (
		<Fragment>

			{/* Notch/top region for iOS, otherwise size 0 */}
				<SafeAreaView style={styles.notch}>
				<StatusBar barStyle="light-content"/>
			</SafeAreaView>

			{/* Remainder of app view, including home bar for iOS */}
			<SafeAreaView style={styles.bottom}>
				<Header text="Bee Here" />
				<CodeInput onChange={(value) => onCodeInputChange(value)}/>
				<View style={{height: '100%', flex: 1}}/>
				<LocationButton />
				<View style={{height: '100%', flex: 1}}/>
				<PresentButton onPress={() => onPresentPress()}/>
			</SafeAreaView>
	
		</Fragment>
	);
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

export default App;
