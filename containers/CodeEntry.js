import React, { useState } from 'react';
import { API_URL } from '../globals';
import { Platform, StatusBar, SafeAreaView, Text, View, Alert, StyleSheet } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../redux/actions/token';
import { setView, LOGIN } from '../redux/actions/view';

import Header from '../components/Header';
import CodeInput from '../components/CodeEntry/CodeInput';
import PresentButton from '../components/CodeEntry/PresentButton';


const CodeEntry = () => {

	const [student, setStudent] = useState(null);
	const [code, setCode]       = useState('');

    const dispatch = useDispatch();
    const token   = useSelector(store => store.token.token);

	// Sets the student state to the Django server Student object that is
	// associated with the User that is currently logged in
	//
	// If there is is an error or no student is found, it pushes out an
	// alert indicating what's wrong and logs the user out
    const fetchStudent = async () => {
        const queryResult = await fetch(API_URL + 'student?is_user=True',
		{	
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();
        
        if('detail' in queryObj) {
            Alert.alert('Error', queryObj['detail']);
			dispatch(setView(LOGIN));
			dispatch(clearToken());
        } else if (queryObj.length < 1) {
            Alert.alert('Error', 'No student found');
			dispatch(setView(LOGIN));
			dispatch(clearToken());
        } else {
			let foundStudent = queryObj[0];
			setStudent(foundStudent);
		}
    }

	// Returns the Django server classroom session code based
	// on the provided class code
	//
	// If there is no session with that class code,
	// returns null
	const fetchClassroomSessionId = async classCode => {
		const queryResult = await fetch(API_URL + 'session?class_code=' + classCode, 
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();

		if(queryObj.length < 1) {
			Alert.alert('Error', 'No classroom session with that code was found.');
			return null;
		} else {
			let foundSession = queryObj[0];
			return foundSession.id;
		}
	}

	// Attempts to POST an attendance transaction based on the 
	// session's server ID and the student's server ID
	//
	// If it is successful, it pushes out an alert indicating so
	// If if fails, it pushes out an alert indicating so
	const postAttendanceTransaction = async (sessionServerId, studentServerId) => {
		const queryResult = await fetch(API_URL + 'attendance',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			},
			body: JSON.stringify({
				'session': sessionServerId,
				'student': studentServerId
			})
		});
		const queryObj = await queryResult.json();
		// console.log("Attedance transaction POST result:");
		// console.log(queryObj);

		if ('detail' in queryObj) {
			Alert.alert('Error', queryObj['detail'])			// Authentication error
		} else if ('non_field_errors' in queryObj) {
			Alert.alert('Error', queryObj['non_field_errors'])	// Validaton error
		} else {
			Alert.alert('Success', 'You have been marked present in this class.');
		}
	}

	const handlePresentPress = async () => {
		sessionId = await fetchClassroomSessionId(code);

		console.log("studentId: ", typeof(student.id));
		console.log("sessionId: ", typeof(sessionId));

		console.log("studentId: ", student.id);
		console.log("sessionId: ", sessionId);

		if(sessionId !== null)
			postAttendanceTransaction(sessionId, student.id);

	}

    if(student === null)
        fetchStudent();


    return(
        <>
            {/* Notch/top region for iOS, otherwise size 0 */}
			<SafeAreaView style={styles.notch}>
				<StatusBar barStyle="light-content"/>
			</SafeAreaView>

			{/* Remainder of app view, including home bar for iOS */}
			<SafeAreaView style={styles.bottom}>
				<Header text="Bee Here" />

                <Text style={styles.greetingText}>
                    Hello{(student === null) ? '.' : ', ' + student.name}
                </Text>

				<View style={{height:'100%', flex:1}}/>

				<CodeInput onChange={value => setCode(value)}/>

				<View style={{height:'100%', flex:1}}/>

				<PresentButton onPress={() => handlePresentPress()}/>
			</SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
	notch: {
	  flex: 0,
	  backgroundColor: '#171717',
	  paddingTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0
	},

	bottom: {
	  width: '100%',
	  flex: 1,

	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#171717'
	},

	greetingText: {
		flex: 0,
		paddingBottom: 50,

		textAlign: 'center',
		
		color: "#ffcc33",
		fontSize: 40,
		fontWeight: '800',
	}
});

export default CodeEntry;