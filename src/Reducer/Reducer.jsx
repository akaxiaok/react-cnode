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


const DB = (ID = '', seting = {}) => {
  const cb = {
    setDefault: (state, target) => {

      if (target) {
        state.defaults = merged(state.defaults, target);
        return Object.assign({}, state);
      } else {
        const defaults = merged({
          url: '/api/v1/topics',
          path: '', // 当前页面的href
          loadAnimation: true, // true显示加载动画，false 不显示加载动画
          loadMsg: '加载中', // 加载提示
          data: null, // 页面的数据
          scrollX: 0, // 滚动条X
          scrollY: 0, // 滚动条Y
          mdrender: true, // 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
        }, seting);
        return {
          defaults,
          path: {},
        };
      }
    },
    setState: (state, target) => {
      if (!state.path[target.path]) {
        state.path[target.path] = target.data;
      } else {
        state.path[target.path] = state.path[target.path].concat(target.data);
      }
      return Object.assign({}, state);
    },
  };
  return (state = {}, action = {}) => {
    if (action.ID && action.ID !== ID) {
      return state;
    } else if (cb[action.type]) {
      return cb[action.type](state, action.target);
    }
    return cb.setDefault();
  };
};
// const IndexList = DB('IndexList', { page: 1, nextBtn: true, limit: 10, mdrender: false, data: [], tab: 'all' }); // 首页
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

}
function IndexList(state = { status: defaultIndextStatus }, action) {
  switch (action.type) {
    case 'setData':
      debugger;
      const { path, data } = action.target;
      if (state[path] === undefined) {
        const status = Object.assign({}, defaultPageStatus);
        state[path] = { status, lists: data };
      } else {
        state[path].status.page += 1;
        state[path].lists = state[path].lists.concat(data);
      }
      return Object.assign({}, state);
    case 'setStatus':
      state.status = Object.assign({}, state.status, action.target);
      return Object.assign({}, state);
    case 'setScroll':
      debugger
      state[state.status.path].status = Object.assign({}, state[state.status.path].status, data);
      return Object.assign({}, state);
    default:
      return state;
  }
}

const Topic = DB('Topic'); // 主题详情
const MyMessages = DB('MyMessages'); // 消息
const UserView = DB('UserView', { tabIndex: 0 }); // 用户详情

export default { IndexList, Topic, MyMessages, UserView, User };

