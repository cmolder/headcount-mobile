import React from 'react';
import { Platform, StatusBar, SafeAreaView, Text, Alert, StyleSheet } from 'react-native';

// Redux
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../redux/actions/token';
import { setView, CODE_ENTRY } from '../redux/actions/view';

import { AUTH_URL } from '../globals';

// Components
import LoginInput from '../components/Login/LoginInput';

const Login = () => {

	const dispatch = useDispatch();

	const handleLogin = async (username, password) => {
		const authResult = await fetch(AUTH_URL,
        {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const authObj = await authResult.json();

        if(typeof authObj.token === 'undefined') {
			dispatch(clearToken());
			Alert.alert('Error authenticating.', 'Did you enter your credentials correctly?');
        } else {
            dispatch(setToken(authObj.token));
            dispatch(setView(CODE_ENTRY));
        }
	}

    return(
        <>
            {/* Notch/top region for iOS, otherwise size 0 */}
			<SafeAreaView style={styles.notch}>
				<StatusBar barStyle="light-content"/>
			</SafeAreaView>

			{/* Remainder of app view, including home bar for iOS */}
			<SafeAreaView style={styles.bottom}>
				<Text style={styles.greetingText}>
					Log in to Bee Here
				</Text>
				<LoginInput onLogin={(user,pass) => handleLogin(user, pass)}/>
			</SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
	notch: {
	  flex: 0,
	  backgroundColor: '#171717',
	  paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0
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

export default Login;