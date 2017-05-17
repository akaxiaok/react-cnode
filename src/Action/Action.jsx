import promis from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { config } from '../Tool';

const server = config;


export default (ID) => {
  const action = {};
  const arr = [
    'signinSuccess', // 登录成功
    'signin', // 退出登录
    'setState', // 设置状态
  ];
  for (let i = 0; i < arr.length; i += 1) {
    // action[arr[i]] = target => ({ _ID, target, type: arr[i] });
    action[arr[i]] = target => ({ target, type: arr[i], ID });
  }
  return action;
};


export function setState(target) {
  return { type: 'setDefaut', target };
}
export function startFetch() {
  const target = {
    loadAnimation: true,
    loadMsg: '正在加载中...',
  };
  return {
    type: 'setDefault', target,
  };
}
export function endFetch(page) {
  const nextPage = page + 1;
  const target = {
    loadAnimation: false,
    loadMsg: '上拉加载更多',
    page: nextPage,
  };
  return {
    type: 'setDefault', target,
  };
}
export function nomoreData() {
  const target = {
    loadAnimation: false,
    loadMsg: '没有了',
  };
  return {
    type: 'setDefault', target,
  };
}

export function fetchError() {
  const target = {
    loadAnimation: false,
    loadMsg: '加载失败',
  };
  return {
    type: 'setDefault', target,
  };
}
export function setPath(path) {
  const target = { path };
  return {
    type: 'setDefault', target,
  };
}
export function setPosition(scrollX, scrollY) {
  const target = { scrollX, scrollY };
  return {
    type: 'setDefault', target,
  };
}
export function getNextPage(data) {
  return function get(dispatch) {
    const { page, limit, mdrender, tab, url, path } = data;
    dispatch(startFetch());
    return fetch(`${server.target}${url}?page=${page}&limit=${limit}&mdrender=${mdrender}&tab=${tab}`).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((json) => {
      const target = { data: json.data };
      target.path = path;
      dispatch(endFetch(page));
      dispatch({ target, type: 'setState' });
    }).catch((e) => {
      throw new Error('Bad response from server');
    });
  };
}
