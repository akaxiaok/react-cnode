import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Action';
import Header from './Header';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
function main(props) {
  return (
    <div>
      <Header title="退出" leftIcon="fanhui" />
      <div className="signin" data-flex="dir:top main:center cross:center" >
        <div className="center" >
          <button className="btn btn-red" onClick=
            {() => {
              props.signin();
              browserHistory.replace({ pathname: '/' });
            }}
          >确认退出登录？
          </button>
        </div>
      </div>
    </div>
  );
}


export default connect(state => ({ User: state.User }), action())(main); // 连接redux
