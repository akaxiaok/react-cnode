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


export function startFetch() {
  const target = {
    loadAnimation: true,
    loadMsg: '正在加载中...',
  };
  return {
    type: 'setStatus', target,
  };
}
export function endFetch() {
  const target = {
    loadAnimation: false,
    loadMsg: '上拉加载更多',
  };
  return {
    type: 'setStatus', target,
  };
}

export function setScroll(x, y) {
  const target = {
    scrollX: x,
    scrollY: y,
  };
  return {
    type: 'setScroll', target,
  };
}
export function nomoreData() {
  const target = {
    loadAnimation: false,
    loadMsg: '没有了',
  };
  return {
    type: 'setStatus', target,
  };
}

export function fetchError() {
  const target = {
    loadAnimation: false,
    loadMsg: '加载失败',
  };
  return {
    type: 'setStatus', target,
  };
}
export function setStatus(target) {
  return {
    type: 'setStatus', target,
  };
}
export function getNextPage(data, page) {
  return function get(dispatch) {

    const { limit, mdrender, tab, url, path } = data;
    dispatch(startFetch());
    return fetch(`${server.target}${url}?page=${page}&limit=${limit}&mdrender=${mdrender}&tab=${tab}`).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((json) => {
      const target = { data: json.data };
      target.path = path;
      dispatch({ target, type: 'setData' });
      dispatch(endFetch());
    }).catch(() => {
      dispatch(fetchError());
    });
  };
}
