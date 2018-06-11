import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

const reducer = {
	[types.SET_LOGGED_IN_STATE](state, action) {
		return action;
	}
};

export const loggedInStatus = createReducer({},reducer);

// export const loggedInStatus = createReducer({},{
// 	[types.SET_LOGGED_IN_STATE](state, action) {
// 		return action;
// 	}
// }); 上はこれを簡単にしたもの

/*

// actionタイプをreducers(handlers)が含む時と含まない時の処理を行う  createReducer関数でwrapしたのは　handlers を別ファイルで指定したかったから
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		return state;
	}
}

方法① 処理の振り分け(例外を ! で処理)

// object として Reducerを用意　
const reducers =  {
		'SET_LOGGED_IN_STATE' : (state, action) => (
		return {
			...state,
			// status: 1,
		}
		);
	}

// dispatchされるactionタイプをreducersが含む時と含まない時の処理を行う関数を用意
function books(state = null, action) {
		    if (!reducers[action.type]) {
		    	return state;
		    }
		    return reducers[action.type](state, action);
		}


方法②  typeによってswitch文(例外を default で処理)

	function reducer(state = [], action) {
		switch (action.type) {
		case types.SET_LOGGED_IN_STATE: 
		  return {
		    ...state,          //  return Object.assign({}, state);  でも可
	      };
	    default: 
	    return state;
	    }
	}

*/



