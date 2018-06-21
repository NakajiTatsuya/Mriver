import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
// reduxとreact-navigationの橋渡し
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  (state) => state.nav,
);

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			//使用するMiddlewareを書く
			thunkMiddleware,
			navigationMiddleware,
			loggerMiddleware,
			),
		// thirdPartyLibraryを使用時はここに書く
		);
	return createStore(reducer, initialState, enhancer);
}

export default configureStore({});


/*
参照 https://qiita.com/kiita312/items/377787c24efac64f2495
Storesの役割は、
・stateを保持する
・stateへアクセスするためのgetState()を提供する
・stateを更新するためのdispatch(action)を提供する
・リスナーを登録するためのsubscribe(listener)を提供する

applyMiddlewareもenhancerの一種, Middlewareを組み込んだStoreを生成するためのcreateStoreを返している
https://qiita.com/cortyuming/items/74410807a1c871b380a1 redux-thunk state を非同期処理で操作するためのツール


*/

// https://github.com/evgenyrodionov/redux-logger#usage
// {predicate} 各々アクションがミドルウェアに処理される前に関数が呼び起こされる




  
  

