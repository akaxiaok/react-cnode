import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducer/Reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
let store = null;
if (composeEnhancers) {
// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
  store = createStore(
    combineReducers(reducer),
    composeEnhancers(applyMiddleware(thunk)),
  );
} else {
  store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk),
  );
}


export default store;
