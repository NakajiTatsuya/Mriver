import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  (state) => state.nav,
);

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			navigationMiddleware,
			loggerMiddleware,
			),
		);
	return createStore(reducer, initialState, enhancer);
}

export default configureStore({});


/*
createStore(combineReducerでつくられたreducer, stateの初期値)

参照 https://qiita.com/kiita312/items/377787c24efac64f2495
Storesの役割は、
・stateを保持する
・stateへアクセスするためのgetState()を提供する
・stateを更新するためのdispatch(action)を提供する
・リスナーを登録するためのsubscribe(listener)を提供する

 storeは受けたactionと現在保持しているstateをreducerへ渡す
*/

// https://github.com/evgenyrodionov/redux-logger#usage
// storeをつくるには、combineReducerでつくられたreducerをcreateStore()へ渡します。
// stateの初期値を渡したい場合にはcreateStoreの第２引数に入れます。

// {predicate} 各々アクションがミドルウェアに処理される前に関数が呼び起こされる




  
  

