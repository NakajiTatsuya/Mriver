//actionのタイプによってstateを変化させるReducerを作るcreateReducerを作成(Reducerを用意する度にswitch文を何度も使いたくない)
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		return state;
	}
}



// [ActionTypes.ADD_TODO](state, action) {} is equivalent to [ActionTypes.ADD_TODO]: function(state, action) {}

// reducerは、前のステートとアクションを受けてstateを変更するシンプルなメソッドです

// https://javascript.tutorialhorizon.com/2016/07/23/create-reducer-for-redux-applications/

// var o = new Object();

// o.prop = 'exists';
// o.hasOwnProperty('prop');              true を返す
// o.hasOwnProperty('toString');          false を返す
// o.hasOwnProperty('hasOwnProperty');    false を返す

/*
https://javascript.tutorialhorizon.com/2016/07/23/create-reducer-for-redux-applications/

function setSurveySuccess(state, action) {
  return newState;
}

function setSurveyFail(state, action) {
  return newState;
}

function currentSurveyReducer(state, action) {
  switch(action.type) {
    case 'CREATE_SURVEY':
      return setSurveySuccess(state, action);
    case 'CREATE_SURVEY_FAIL':
      return setSurveyFail(state, action);
    default:
      return state;
  }
}

switch case文を連続するので、連続したコードを書くのを避けてくれるcreateReducer in redux-create-reducer 

import { createReducer } from 'redux-create-reducer';

function currentSurveyReducer = createReducer(state, {
    'CREATE_SURVEY': setSurveySuccess,
    'CREATE_SURVEY_FAIL': setSurveyFail
});


ちなみに、importしたcreateReducerの内容は、コードで書くと以下の内容

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {

      //handlersオブジェクトがaction.typeプロパティを持つ時、第二引数のaction.typeプロパティに該当する値(例えばsetSurveySuccess,setSurveyFail)を返す
      return handlers[action.type](state, action)
    } else {

      //action.typeがないときは、第一引数の初期ステートを返す
      return state
    }
  }
}
*/








