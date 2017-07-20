import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
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
      <Header title="退出" leftIcon="back" />
      <div className="signin flex justify-content-center align-items-center" >
        <div className="center" >
          <RaisedButton fullWidth={true} onTouchTap={() => {
            props.signOut();
            browserHistory.replace({ pathname: '/' });
          }} primary={true} label="确认退出?" />
        </div>
      </div>
    </div>
  );
}


export default connect(state => ({ User: state.User }), action())(main); // 连接redux
