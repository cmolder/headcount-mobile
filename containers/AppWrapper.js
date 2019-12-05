// React / React Native
import React from 'react';

// Redux;
import { useSelector } from 'react-redux';
import { LOGIN, CODE_ENTRY, PROFILE } from '../redux/actions/view'; 

// Components
import Login from './Login';
import CodeEntry from './CodeEntry';

const AppWrapper = () => {

    const view  = useSelector(store => store.view.view);

	switch(view){
		case PROFILE:
			return (<Login/>);
		case CODE_ENTRY:
			return(<CodeEntry/>);
		case LOGIN:
		default:
			return (<Login/>);
	}
}

export default AppWrapper;
