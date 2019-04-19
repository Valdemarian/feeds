import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundry from './components/error-boundry';

import App from './App';

import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundry>
	</Provider>, 
document.getElementById('root'));

