import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PresentButton from './components/PresentButton';
import LocationButton from './components/LocationButton';

const App = () => {

	const [code, setCode] = useState('000000');
	const [classroom, setClassroom] = useState(null);

	useEffect(() => {
		console.log("Code changed!", code);

		

	}, [code]);

	const onCodeInputChange = (value) => {
		setCode(value);
	}

	async function getClassroomFromCode() {
		let djangoId = code; // TODO rewrite this to search by classcode


		try {
			const link = 'https://headcount-server.herokuapp.com/api/classroom/' + djangoId; // TODO host this on a server
			console.log(link);
			
			const res = await fetch(link);
			const foundClassroom = await res.json();
			
			setClassroom(foundClassroom);
			alert(foundClassroom['department'] + " " + foundClassroom['number'] + "\n" + foundClassroom['class_code']);

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
