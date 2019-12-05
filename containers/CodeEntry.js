import React, { useState } from 'react';
import { Platform, StatusBar, SafeAreaView, Text, Alert, StyleSheet } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../redux/actions/token';
import { setView, PROFILE, LOGIN } from '../redux/actions/view';


const CodeEntry = () => {

    const [student, setStudent] = useState(null);

    const dispatch = useDispatch();
    const token = useSelector(store => store.token.token);

    async function fetchStudent() {
        const queryResult = await fetch('https://headcount-server.herokuapp.com/api/student?is_user=True',
		{	
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();
        
        if('detail' in queryObj) {
            Alert.alert(queryObj['detail']);
			dispatch(setView(LOGIN));
			dispatch(clearToken());
        } else if (queryObj.length < 1) {
            Alert.alert('No student found');
			dispatch(setView(LOGIN));
			dispatch(clearToken());
        } else {
			let foundStudent = queryObj[0];
			setStudent(foundStudent);
			Alert.alert(foundStudent.name, foundStudent.student_id);
		}
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
                <Text style={styles.greetingText}>
                    Hello{(student === null) ? '.' : ', ' + student.name}
                </Text>
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