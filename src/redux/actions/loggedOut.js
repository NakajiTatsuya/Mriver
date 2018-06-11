import * as types from './types';
import  user from '../../data/user.json';

export function logIn(email, password) {
  return (dispatch, getState) => {
    if (email === user.email && password === user.password) {
      //storeへ作成したアクションを送る Reducerがstateを管理してStoreを作成
      dispatch(setLoggedInState(true));
      return true;
    }
    dispatch(setLoggedInState(false));
    return false;
  }
}

//関数のaction
export function setLoggedInState(loggedInState) {
  return {
  	type: types.SET_LOGGED_IN_STATE,
  	loggedInState,
  }
}


/*
 * action creators (アクションを返す)
 アクション...「何をする」という内容を持ったオブジェクト。

 */

// type: アクションの名前, bool/
// setLoggedInState関数でSET_LOGGED_IN_STATEアクションのtrue,falseを決める


//アクションをstoreに送るとき　store.dispatch(メソッド) を使用する

