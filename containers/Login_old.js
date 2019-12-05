import React from 'react';
import { Alert, StyleSheet, Platform, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';


// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setToken, clearToken } from '../redux/actions/token';
import { setView, CODE_ENTRY } from '../redux/actions/view';

// Components
import Header from '../components/Header';
import CodeInput from '../components/CodeInput';
import PresentButton from '../components/PresentButton';
import LocationButton from '../components/LocationButton';
import StudentInfo from '../components/StudentInfo';

const Login = () => {

    return(
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
    )
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

export default Login;