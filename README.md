# Mriver


***Reduxについて***

store...アプリケーションのstateを保持する場所

	(例)本を読んでいるかどうかの状態を管理している
	{
		status: 0 // 0: 手をつけていない, 1: 読み途中, 2: 読了
	}

dispatcher...全てのデータを管理するもの。全てのActionをstoreへ運ぶベルトコンベアーのようなもの

	(例)actionをdispatchする例
	{
		type: 'START_READING' //これがstoreへdispatchされると storeのstatusが 0(未読) から 1(読み始め) になる
	}

Reducer...actionの内容によってstateの管理を行うもの 
          Reducerは状態変化を行い、Componentは状態変化に応じてViewを描画する

	(例)( actionの type:'START_READING' により) store の statusが 0(未読) から 1(読み始め) になる
	const reducers = {
	  START_READING : (state, action) => (
	    return {
		...state,      //...stateにより、[state1, state2, state3, ... ,state_n] => (state1, state2, state3, ... ,sate_n) に展開される
		status: 1,
	  };
	  ),
	  FINISH_READING : (state, action) => (
	  retunrn {
	  ...state,
	  status: 2,
	  };
	  ),
	  アクション名 : (今のステート, アクション) => (
	  	<ステートを変更処理>
	  	)
	}

	function books(state = null, action) {
		if (!reducers[action.type]) {
		return state;
	    }
	    return reducers[action.type](state, action);
	}

<Reducerの注意点>
objecyの参照渡しは危険!!参照元のデータまで変更されてしまう!!

(Reducerの値渡し)
	let x = 10;
	let  y = x;
	y = 5;
	console.log(y); // 5       10が上書きされて 5
	console.log(x); // 10      xは元のまま 
	// xとyの格納場所は別在している

(Reducerの参照渡し)
	let x = [1, 2, 3];
	let y = x;
	y[1] = 4;
	console.log(y); // [1, 4, 3]   2が上書きされて 4
	console.log(x); // [1, 4, 3]   xは元のまま・・・ではない!
	//yは、xの値が入った配列のメモリーを参照しているので、yの変更がxにまで影響されてしまう!!

(Reducerの参照渡し)
	const member = [
	{
		id: 1,
		name: 'Taro',
	},
	{
		id: 2,
		name: 'Jiro',
	}
	];

	member.push({
	    id: 3, 
	    name: 'Saburo'
	});
   
    (memberの変化)  参照渡しになっており、memberのメモリを参照してデータを加えているので元のmemberにデータが追加されている
	const member = [
	{
		id: 1,
		name: 'Taro',
	},
	{
		id: 2,
		name: 'Jiro',
	},
	{
		id: 3, 
	    name: 'Saburo',
	}
	];

そこで...オブジェクトや配列の操作は基本的に　Object.assign で 値のコピーを渡す

	function books(state = null, action) {
		    switch (action.type) {
		    	case 'START_READING':
		    	return Object.assign({}, state, { states: 1 });
		    	case 'FINISH/READING':
		    	return Object.assign({}, state, { states: 2 });
		    	default: state;
		    }
		}


***Reduxで状態管理について***

ReactなしののReduxのみでアプリ作成例 (Store, Reducer, Action)

①Reducerを定義する

    初期状態(空)の作成
	const initialState = {
	tasks: []
	};

    Reducerの定義
	function tasksReducer(state = initialState, action) {
		switch (action.type) {
			case: 'ADD_TASK':
			return{
				..state,
				tasks: state.tasks.concat([action.tasks]) //  現在のstateのtasksオブジェクトに[action.task]配列を合体させる
				                                         // state.tasks.push(action.task);
				                                         // をもし使うと、参照受け渡しなので、現在のstate自体に変化を加えてしまうため危険!!
				                                         // 元のstateに変更を加えない < concat, Object.assign,SpreadOperator >
				                                         // による値渡しが最適!!
			};
			default: return state;
		}
	}

    actionの例(typeと情報を持ったオブジェクト)
		{
		type: 'ADD_TASK',
		payload: {
		task: 'reducerを学ぶ'
		}
		}

②ActionCreatorを定義する( addTask('task内容')で簡単にactionが作れる )
	
	const addTask = (task) => ({
		type: 'ADD_TASK',
		payload: {task}
	});

③Storeを生成する(storeでアプリ全体の状態を管理)

	import { createStore } from 'redux';
	import tasksReducer from 'tasksReducerのパス';
	const store = createStore(tasksReducer);

    createReducer(reducer, [preloadedState], [enhancer])に関して...
	storeを作成する関数。
	第一引数は Reducer(今回はtasksReducer),
	第二引数は Storeの初期状態state(サーバーサイドやユーザー情報(session)など、事前にデータを保持している場合に利用)
	第三引数は Storeの機能を拡張するためのサードパーティ製のツールをオプションとして指定可能。Reduxに含まれているapplyMiddleware()も指定できる
	作成されたStoreの中身は四つのメソッドを持つオブジェクト
・dispatch
・subscribe
・getState
・replaceReducer

Actionをstoreに送信するために,storeのメソッド ・dispatch(action)を使用
	
	const addTask = (task) => ({
			type: 'ADD_TASK',
			payload: {task}
		});
		store.dispatch(addTask('Storeを学ぶ')); //'ADD_TASK'タイプのactionが発行され、reducerによってstateが変化する

Storeの現在の状態を確認知るために,作られたstoreのメソッド ・getStateを使用

	console.log(store.getState())       // tasks: ['Storeを学ぶ']

dispatchによってStoreの状態が変化するたびに呼ばれるコールバック関数を設定するために,メソッド ・subscribeを使用(状態変化を監視)

	import { createStore } from 'redux';
	import tasksReducer from 'tasksReducerのパス';
	const store = createStore(tasksReducer);

	function handleChange() {
	console.log(store.getState());   // dispatch後のstateを確認   tasks: ['Storeを学ぶ']
	}
	const unsubscribe = store.subscribe(handleChange) //state変化(dispatch)の度にコールバック関数として,状態確認のhandleChange関数が呼び起こされる
	                                              //  unsubscribe() を実行すると解除される
	const addTask = (task) => ({
	type: 'ADD_TASK',
	payload: {task},
	});
	console.log(store.getState());  // dispatch前の状態を確認  tasks: []
	store.dispatch(addTask('storeを学ぶ'));

アプリケーションの規模が大きくなるとログイン用やログアウト用など、Reducerを分割して管理したくなる。ReduxにはcombineReducersメソッドは用意されており、
結合させた後、storeを作成することも多い。
combineReducersを使わずに,Reducerを動的にロードしたい場合は,Storeに関連づけているReducerを他のReducerに差し替えてあげる必要がある。
そのために用いるのがreplaceReducerです。

	import { createStore, replaceReducer } from 'redux';

	const initialState = {
		tasks: []
	};

	//タスク追加のReducerを作成
	function addReducer(state = initialState, action) {
		switch (action.type) {
		case 'ADD_TASK': 
		  return {
		    ...state,          //  state配列を全部展開
		    tasks: state.tasks.concat([action.tasks])  // 現在のtasksにactionのtasksを合体 pushを使うと元のstateに変更を与えてしまう
	      };
	    default: 
	    return state;
	    }
	}

	//タスク初期化のReducerを作成
	function resetReducer(state = initialState, action) {
		switch(action.type) {
		case 'RESET_TASK':
		  return {
		    ...state,
		    tasks: []
	      };
	    default: 
	    return state;  //  'RESET_TASK'じゃない場合は現在のstateを受け継ぐ
	    }
	}

	const store = createStore(addReducer);  // addReducerをReducerとするStoreを作成
	const addTask = (task) => ({
		type: 'ADD_TASK',
		payload: {task}
	});

	store.dispatch(addTask('Storeを学ぶ'))
	console.log(store.getState());         // tasks: ['Storeを学ぶ']

	store.replaceReducer(resetReducer);
	console.log(store.getState());         // tasks: ['Storeを学ぶ']

	const resetTask = () => ({
		type: 'RESET_TASK'
	});

	store.dispatch(resetTask());  //  'RESET_TASK'タイプにかわり、resetReducerによってtasksのstateを初期化される
	console.log(store.getState());  // tasks: []   初期化された!!

理由がなければ, comibneReducerを使って一つにまとめるのが楽!!
comibneReducerはReduxに備わっているメソッドで,各Reducerを合成する役割を持つ



***react-reduxに関して***
大きく　
・<Provider> 
・connect

Provider...connect関数が使えるようになり、store.dispatchを使用せずにReactコンポーネントをstoreと繋げることができる。
　　　　　　もしこれを使わないなら,一旦storeをimportした後にコンポーネントからstore.dispatch を行うため, バケツリレー
　　　　　　のような不恰好な処理になる。 smartなstoreとの接続方法。

(例) <Provider>の用い方

	import { createStore } from 'redux';
	import Provider from'react-redux';
	import store from './src/redux/store';
	import Todo from './components';
	import ...
	const store = createStore(tasksReducer);
	render(){
	return(
		<Provider store = {store}>  // Componentとstoreで通信を行う(connectを使う)ためには...storeを指定したProviderでラップする
		      <Todo />
		</Provider>
		);
	}

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) に関して

connect 第一引数　mapStateToProps... ここで指定した関数は,Storeからstateを取り出してComponentのPropsに割り当てる関数になる(storeのstateを使用できる)

	(例)function mapStateToProps({ stateOfStore, tasks }){
		return {
		stateOfStore,  // store の　state が　届く　{ task: ['勉強する'] }
		tasks,  
		};
	}
mapStateToPropsでreturnされるとconnect先のComponentのPropsとして使用可
mapStateToPropsの第二引数は親Componentから引き継がれてきたPropsが格納されている(optional)

connect第二引数 mapDispatchToProps...actionのdispatch処理をこの関数内に閉じることでComponentからdispatchの概念を隠蔽する(わかりやすくて見やすい)

	(例)// ActionCreator
	const addTask = (task) => ({
		type: ADD_TASK,
		payload: {task},
	});
	function mapDispatchToProps(dispatch) {
		return {
		addTask(task){
		dispatch(addTask(task));
	        }
	    };
	}

mapDispatchToPropsは第一引数にStoreのdispatchメソッドが渡ってきます。第二引数はmapStateToPropsと同じで親Componentから引き継がれてきたProps

connect第三引数 mergeProps 第一引数　mapStateToPropsとmapDispatchToPropsを経たPropsと親Vomponentから渡ってきた[ownPrios]をマージして
　　　　　　　　　コンポーネントに渡す

	(例)三つをマージする関数
	function mergeProps(stateProps, dispatchProps, ownProps) {
		return Object.assign({}, ownProps, stateProps, dispatchProps);
	}

mergePropsを変更することでPropsを組み合わせてコンポーネントに渡すことができる
mapDispatchToPropsでstateの値を利用したい場合,通常コンポーネントのProps経由で受け取ったstateを引数に渡すことで利用可能だが、
mergePropsを用いることで、コンポーネントを介さずにstateを引数として受け取れる(下に例を示す)


	// Storeから task, tasks のstateを取得
	function mapStateToProps({ task, tasks }) {
		return {
		task,
		tasks,
	    };
	}

	// dispatchを関数内で隠蔽
	function mapDispatchToProps(dispatch) {
		return {
		  inputTask(task) {
		    dispatch(inputTask(task));  //取得したtaskのstateでactionをdispatch
	      },
	      addTask(task) {
		    dispatch(addTask(task));   //actionをdispatch
	      },
	    };
	}

	function mergeProps(stateProps, dispatchProps, ownProps) {
	const merge = {
	  ...dispatchProps,
	  addTask() {
		dispatchProps.addTask(stateProps.task);
	  }
	};
			return Object.assign({}, ownProps, stateProps, merge);
		} 











