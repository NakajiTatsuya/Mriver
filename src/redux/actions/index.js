import * as LoggedOut from './loggedOut';

export const ActionCreators = Object.assign({},
  LoggedOut,
);

// const ActionCreator = [];
// export const ActionCreators = ActionCreator.concat(LoggedOut); でも可! ActionCreator.push(LoggedOut); は参照参照渡しなのでよくない

/*
// Merge multiple sources
let a = Object.assign({foo: 0}, {bar: 1}, {baz: 2});
ChromeSamples.log(a);
 {foo: 0, bar: 1, baz: 2}

 // Merge and overwrite equal keys
let b = Object.assign({foo: 0}, {foo: 1}, {foo: 2});
ChromeSamples.log(b);
// {foo: 2} 同じプロパティは最新のvalue値で上書き

// Clone an object
let obj = {person: 'Thor Odinson'};
let clone = Object.assign({}, obj);
ChromeSamples.log(clone);
*/



// このファイルは actions というメソッドを書きます。（これはイベント際に呼びます）

// Object.assign(ターゲットオブジェクト, ...ソースオブジェクト)
// Object.assignを使用してstateのコピーを作成しています
// 空のオブジェクトにマージさせないといけません。