// 스토어 설정/구성 
// 이 스토어에서 여러 리듀서들을 합처줌
import { createStore, combineReducers } from  "redux";
import users from  './modules/users';

const reducer = combineReducers({
	users
})

let store = initialState => createStore(reducer);

export default store();