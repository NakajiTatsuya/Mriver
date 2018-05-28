import * as types from './types';
import  user from '../../data/user.json';

export function logIn(email, password) {
  return (dispatch, getState) => {
    if (email === user.email && password === user.password) {
      dispatch(setLoggedInState(true));
      return true;
    }
    dispatch(setLoggedInState(false));
    return false;
  }
}

export function setLoggedInState(loggedInState) {
  return {
  	type: types.SET_LOGGED_IN_STATE,
  	loggedInState,
  }
}


/*
 * action creators (アクションを返す)
 */

// type: アクションの名前, bool/
// setLoggedInState関数でSET_LOGGED_IN_STATEアクションのtrue,falseを決める


//アクションをstoreに送るとき　store.dispatch(メソッド) を使用する

