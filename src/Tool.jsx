import merged from 'obj-merged';
import * as config from './Config/Config';

const { target } = config;
const Tool = {};
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {
  const setting = {
    url: window.location.pathname, // 默认ajax请求地址
    async: true, // true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
    type: 'GET', // 请求的方式
    data: {}, // 发给服务器的数据
    dataType: 'json',
    success(text) {
    }, // 请求成功执行方法
    error() {
    }, // 请求失败执行方法
  };


  const aData = []; // 存储数据
  let sData = ''; // 拼接数据
  // 属性覆盖
  for (var attr in mySetting) {
    setting[attr] = mySetting[attr];
  }
  for (var attr in setting.data) {
    aData.push(`${attr}=${filter(setting.data[attr])}`);
  }
  sData = aData.join('&');
  setting.type = setting.type.toUpperCase();

  const xhr = new XMLHttpRequest();
  function httpEnd() {
    if (xhr.readyState === 4) {
      const head = xhr.getAllResponseHeaders();
      let response = xhr.responseText;
      // 将服务器返回的数据，转换成json

      if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
        response = JSON.parse(response);
      }

      if (xhr.status === 200) {
        setting.success(response, setting, xhr);
      } else {
        setting.error(setting, xhr);
      }
    }
  }
  try {
    if (setting.type === 'GET') { // get方式请求
      sData = `${setting.url}?${sData}`;
      xhr.open(setting.type, `${sData}&${new Date().getTime()}`, setting.async);
      xhr.send();
    } else { // post方式请求
      xhr.open(setting.type, setting.url, setting.async);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(sData);
    }
  } catch (e) {
    return httpEnd();
  }

  if (setting.async) {
    xhr.addEventListener('readystatechange', httpEnd, false);
  } else {
    httpEnd();
  }


  xhr.end = function end() {
    xhr.removeEventListener('readystatechange', httpEnd, false);
  };

  function filter(str) { // 特殊字符转义
    let result = str;
    result += ''; // 隐式转换
    result = result.replace(/%/g, '%25');
    result = result.replace(/\+/g, '%2B');
    result = result.replace(/ /g, '%20');
    result = result.replace(/\//g, '%2F');
    result = result.replace(/\?/g, '%3F');
    result = result.replace(/&/g, '%26');
    result = result.replace(/=/g, '%3D');
    result = result.replace(/#/g, '%23');
    return result;
  }

  return xhr;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, success, error) {
  const setting = {
    url: target + pathname, // 默认ajax请求地址
    type: 'POST', // 请求的方式
    data, // 发给服务器的数据
    success: success || function () {
    }, // 请求成功执行方法
    error: error || function () {
    }, // 请求失败执行方法
  };
  return Tool.ajax(setting);
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.get = function (pathname, data, success, error) {
  const setting = {
    url: target + pathname, // 默认ajax请求地址
    type: 'GET', // 请求的方式
    data, // 发给服务器的数据
    success: success || function () {
    }, // 请求成功执行方法
    error: error || function () {
    }, // 请求失败执行方法
  };
  return Tool.ajax(setting);
};

/**
 * 格式化时间
 *
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
  const date = new Date(str);
  const time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return '刚刚';
  } else if ((time / 60000) < 60) {
    return `${parseInt((time / 60000), 10)}分钟前`;
  } else if ((time / 3600000) < 24) {
    return `${parseInt(time / 3600000, 10)}小时前`;
  } else if ((time / 86400000) < 31) {
    return `${parseInt(time / 86400000, 10)}天前`;
  } else if ((time / 2592000000) < 12) {
    return `${parseInt(time / 2592000000, 10)}月前`;
  }
  return `${parseInt(time / 31536000000, 10)}年前`;
};

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function localItem(key, value) {
  if (arguments.length === 1) {
    return localStorage.getItem(key);
  }
  return localStorage.setItem(key, value);
};

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function removeLocalItem(key) {
  if (key) {
    return localStorage.removeItem(key);
  }
  return localStorage.removeItem();
};

export { Tool, merged, config };
