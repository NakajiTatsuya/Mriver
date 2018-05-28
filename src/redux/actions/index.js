import * as LoggedOut from './loggedOut';

export const ActionCreators = Object.assign({},
  LoggedOut,
);









// このファイルは actions というメソッドを書きます。（これはイベント際に呼びます）

// Object.assign(ターゲットオブジェクト, ...ソースオブジェクト)
// Object.assignを使用してstateのコピーを作成しています
// 空のオブジェクトにマージさせないといけません。