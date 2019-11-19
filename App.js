import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PresentButton from './components/PresentButton';
import LocationButton from './components/LocationButton';

const App = () => {

	const [code, setCode] = useState('000000');
	const [classroom, setClassroom] = useState(null);

	const onCodeInputChange = (value) => {
		setCode(value);
	}

	async function getClassroomFromCode() {

		try {
			console.log(code)
			const link = 'https://headcount-server.herokuapp.com/api/classroom?class_code=' + code;
			const queryResult = await fetch(link);
			const queryJson = await queryResult.json();
			console.log(queryJson);
			
			setClassroom(queryJson);
			alert(queryJson[0]['department'] + " " + queryJson[0]['number'] + "\n" + 
				  queryJson[0]['name'] + "\n" + queryJson[0]['professor']);

		} catch (e) {
			console.log("Exception!", e);
		}
	}

	const onPresentPress = () => {
		getClassroomFromCode();
	}


  	return (
		<>

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
	
		</>
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
