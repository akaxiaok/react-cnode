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

export function getNextPage(data) {
  return function get(dispatch) {
    const { page, limit, mdrender, tab, url, path } = data;
    debugger;
    return fetch(`${server.target}${url}?page=${page}&limit=${limit}&mdrender=${mdrender}&tab=${tab}`).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((json) => {
      const target = json;
      target.path = path;
      debugger;
      dispatch({ target, type: 'setState' });
    }).catch((e) => {
      throw new Error('Bad response from server');
    });
  };
}
