import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import PresentButton from './components/PresentButton';
import LocationButton from './components/LocationButton';
import StudentInfo from './components/StudentInfo';

const App = () => {

	const [classCode, setClassCode] = useState('');
	const [studentId, setStudentId] = useState('');

	async function createAttendanceTransaction() {

		try {
			const studentRef = 'https://headcount-server.herokuapp.com/api/student?student_id=' + studentId;
			const studentResult = await fetch(studentRef);
			const studentJson = await studentResult.json();

			const classRef = 'https://headcount-server.herokuapp.com/api/classroom?class_code=' + classCode;
			const classResult = await fetch(classRef);
			const classJson = await classResult.json();

			const attendanceResult = await fetch("https://headcount-server.herokuapp.com/api/attendance",
				{
					method: 'POST',
					body: JSON.stringify({
						'student': studentJson[0]['id'], // Django ID for student
						'classroom': classJson[0]['id']  // Django ID for classroom
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const attendanceJson = await attendanceResult.json();
			
			if(attendanceJson.hasOwnProperty('non_field_errors')) {
				const errorMsg = attendanceJson['non_field_errors'][0];
				if (errorMsg.includes("roster"))
					Alert.alert("Error", "You are not on the roster for this class. Is your student ID correct?");
				else
					Alert.alert("Error", "There was an error while trying to mark you present.");
			}
			else {
				Alert.alert("Success", "You are now marked present in class " + classJson[0]['name']);
			}
		} catch(e) {
			console.log("Exception!", e);
			Alert.alert("Error", "There was an error while trying to mark you present.");
		}
	}

	const onPresentPress = () => {
		createAttendanceTransaction();
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

				<CodeInput onChange={value => setClassCode(value.toUpperCase())}/>

				<View style={{height: '100%', flex: 1}}/>

				<StudentInfo style = {{height: '100%', flex: 1}}
							 onIdChange={value => setStudentId(value)}/>

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
