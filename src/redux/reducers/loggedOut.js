import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

// 特定の条件と具体的な処理を実装し、createReducer関数に登録する
export const loggedInStatus = createReducer({},{
	[types.SET_LOGGED_IN_STATE](state, action) {
		return action;
	}
});



// reducerは、現在のstateとactionを受けて新しいstateを返すだけの純粋なメソッドです。

/*
createReducer(現在のstate,action) により、
第二引数が action.typeプロパティを持つとき,
action.typeのアクションのstate,actionを返す


export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		return state;
	}
}
*/