import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import AppWithNavigationState from './src/navigators/AppNavigator';

console.disableYellowBox = true;

export default class App extends Component {
	render() {
		return (
			<Provider store = {store}>
			  <AppWithNavigationState listener = {createReduxBoundAddListener('root')} />
			</Provider>
			);
	} 
}

/*
ページ遷移命令を受け取るためのリスナー
const addListener = createReduxBoundAddListener('root');
*/