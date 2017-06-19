/* eslint-disable no-param-reassign */
import { Tool, merged } from '../Tool';
/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {
  switch (action.type) {
    case 'signinSuccess': // 登录成功
      Tool.localItem('User', JSON.stringify(action.target));
      return action.target;
    case 'signin': // 退出
      Tool.removeLocalItem('User');
      return null;
    default:
      return state;
  }
};


const defaultIndextStatus = {
  url: '/api/v1/topics',
  path: '/', // 当前页面的href
  loadAnimation: true, // true显示加载动画，false 不显示加载动画
  loadMsg: '加载中', // 加载提示
  mdrender: true, // 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
  tab: 'all',
  limit: 10,
};
const defaultPageStatus = {
  page: 2,
  scrollX: 0, // 滚动条X
  scrollY: 0, // 滚动条Y

};
function IndexList(state, action) {
  switch (action.type) {
    case 'setData':
      if (state[action.target.path] === undefined) {
        const status = Object.assign({}, defaultPageStatus);
        state[action.target.path] = { status, lists: action.target.data };
      } else {
        state[action.target.path].status.page += 1;
        state[action.target.path].lists = state[action.target.path].lists.concat(action.target.data);
      }
      return Object.assign({}, state);
    case 'setIndexStatus':
      state.status = Object.assign({}, state.status, action.target);
      return Object.assign({}, state);
    case 'setScroll':
      if (!state[state.status.path]) {
        return state;
      }
      state[state.status.path].status = Object.assign({}, state[state.status.path].status, action.target);
      return Object.assign({}, state);
    default:
      return { status: Object.assign({}, defaultIndextStatus) };
  }
}

function Topic(state, action) {
  switch (action.type) {
    case 'set':
      state.pages[action.target.url] = Object.assign({},  action.target.data);
      return Object.assign({}, state);
    case 'setPageStatus':
      state.status = Object.assign({}, state.status, action.target);
      return Object.assign({}, state);
    default:
      return { pages: {}, status: Object.assign({}, defaultIndextStatus) };
  }
}

function Messages(state, action) {
  switch (action.type) {
    case 'getMessage':
      state.pages = Object.assign({},  action.target.data);
      return Object.assign({}, state);
    case 'setMessageStatus':
      state.status = Object.assign({}, state.status, action.target);
      debugger;
      return Object.assign({}, state);
    default:
      return { status: Object.assign({}, defaultIndextStatus) };
  }
}

function UserView(state, action) {
  switch (action.type) {
    case 'setUserView':
      state.data = Object.assign({},  action.target.data);
      return Object.assign({}, state);
    case 'setUserViewStatus':
      state.status = Object.assign({}, state.status, action.target);
      return Object.assign({}, state);
    default:
      return { status: { tabIndex: 0, loadAnimation: false, loadMsg: '加载完成' } };
  }
}

export default { IndexList, Topic, Messages, UserView, User };

