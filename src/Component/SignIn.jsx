/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import action from '../Action/Action';
import { Tool } from '../Tool';
import Header from './Header';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      value: '',
      button: '登录',
    };

  }

  signin = () => {
    const accesstoken = this.state.value;
    if ('' === accesstoken) {
      this.setState({ message: '请输入Access Token', open: true });
      return;
    }
    this.setState({ button: '登录中...' });
    Tool.post('/api/v1/accesstoken', { accesstoken }, (res) => {
      if (res.success) {
        res.accesstoken = accesstoken;
        this.props.signinSuccess(res);
        browserHistory.push({
          pathname: `/user/${res.loginname}`,
        });
      } else {
        this.setState({ button: '登录', message: '登录失败', open: true });
      }
    }, () => {
      this.setState({ button: '登录', message: '登录失败', open: true });
    });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  }
  handleRequestClose = () => {
    this.setState({ open: false });
  }
  handleActionTouchTap = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Header title="登录" leftIcon="back" />
        <div className="signin flex justify-content-center align-items-center" >
          <div className="center" >
            <TextField onChange={this.handleChange} fullWidth={true} hintText={'Access Token'} />
            <RaisedButton fullWidth={true} onTouchTap={this.signin} primary={true} label={this.state.button} />
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="OK"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          onActionTouchTap={this.handleActionTouchTap}
        />
      </div>
    );
  }
}


export default connect(state => ({ User: state.User }), action())(Main); // 连接redux
