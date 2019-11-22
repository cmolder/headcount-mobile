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

	useEffect(() => {
		console.log("code", classCode);
		console.log("id", studentId);
	})


	async function createAttendanceTransaction() {

		try {
			const studentRef = 'https://headcount-server.herokuapp.com/api/student?student_id=' + studentId;
			const studentResult = await fetch(studentRef);
			const studentJson = await studentResult.json();

			const classRef = 'https://headcount-server.herokuapp.com/api/classroom?class_code=' + classCode;
			const classResult = await fetch(classRef);
			const classJson = await classResult.json();

			const studentServerId = studentJson[0]['id']; // Django ID for student
			const classroomServerId = classJson[0]['id']; // Django ID for classroom

			const response = fetch("https://headcount-server.herokuapp.com/api/attendance",
				{
					method: 'POST',
					body: JSON.stringify({
						'student': studentServerId,
						'classroom': classroomServerId
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			console.log("Response!", response);

			Alert.alert("Success", "You are now marked present in class " + classJson[0]['name']);

		} catch(e) {
			console.log("Exception!", e);
			Alert.alert("Error", "You have not been marked present. Is the class code correct?")
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
