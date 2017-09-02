//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

//Redux
import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

//import combine reducers
import reducers from './reducers';

//import actions
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/bookActions';

//create the store
const middleware = applyMiddleware(thunk, createLogger());
//we will pass initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);


const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
);

render(
	Routes, document.getElementById('app')
)

