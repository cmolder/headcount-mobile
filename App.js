// React / React Native
import React from 'react';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer/_reducer';

// Components
import AppWrapper from './containers/AppWrapper';

const App = () => {

	const store = createStore(reducer);

  	return (
		<Provider store={store}>
			<AppWrapper/>
		</Provider>
	);
}

export default App;
