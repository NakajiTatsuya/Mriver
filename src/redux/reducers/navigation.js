import createReducer from '../helpers/createReducer';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../navigators/AppNavigator';
import { StatusBar } from 'react-native';

const firstAction = AppNavigator.router.getActionForPathAndParams('LoggedIn');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export const nav = (state = initialNavState, action) => {
	let nextState = AppNavigator.router.getStateForAction(action, state);

	if (action.routeName === 'TurnOnNotifications' || action.routeName === 'LoggedIn' ) {
		StatusBar.setBarStyle('dark-content', true);
	} 
	
	return nextState || state;
};


/*

初期ステートと次のステートを返すreducer

StatusBar.setBarStyle('light-content', true);
The other color options are 'default' and 'dark-content'

<How to set iOS status bar background color>
1-) Add this to your info.plist file: 
<key>UIViewControllerBasedStatusBarAppearance</key>
<string>YES</string>

2-)  then add 
StatusBar.setBarStyle('light-content', true); 
as the first line in your render() 
to change the status bar text/icons to white.
The other color options are 'default' and 'dark-content'.


else if (typeof action.routeName ==='undefined', action.routeName === 'LoggedOut') {
		StatusBar.setBarStyle('light-content', true);
	} 
*/