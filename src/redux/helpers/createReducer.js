// 任意の条件にマッチしたら対応する関数を呼び出す
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		return state;
	}
}


// reducerは、actionを受けてstateを変更するの為のメソッドです
// 具体的には,イベント処理に応じてinitialStateをreturn!!

/*  プログラムの説明
　引数handlersがtypeプロパティーを持っている時、
*/

/*
今後ActionTypeがどんどん増えていくとcaseが増えてSwitch分の中身が複雑になっていく
export function todos(state = [], action) {
  switch (action.type) {
  case ActionTypes.ADD_TODO:
    let text = action.text.trim()
    return [ ...state, text ]
  default:
    return state
  }
}
*/


/*
改善策:'二つに分ける!!'
const ActionType = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO'
}

// 任意の条件にマッチしたら対応する関数を呼び出す
function createReducer (initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}

// 特定の条件と具体的な処理を実装し、上の関数に登録する
const todoReducer = createReducer([], {
  [ActionType.ADD_TODO] (state, action) {
    const text = action.text.trim();
    return [...state, text];
  }
});
*/