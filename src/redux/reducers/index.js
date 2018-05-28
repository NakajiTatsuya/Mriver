import { combineReducers } from 'redux';
import * as LoggedOut from './loggedOut';
import * as Navigation from './navigation';


export default combineReducers(Object.assign(
  LoggedOut,
  Navigation,
));


// 最後に、ReduxではcombineReducers()というユーティリティを提供しており、
// combineReducerでは分割された子reducer名と同じキーのstateが使用されます。
//子reducer [loggedInStatus]
