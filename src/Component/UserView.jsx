/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import GetData from './GetData';
import DataLoad from './DataLoad';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.tab = (tabIndex) => {
      this.state.tabIndex = tabIndex;
      this.props.setState(this.state);
    };
  }

  render() {
    const { data, loadAnimation, loadMsg, tabIndex } = this.props.state;
    let { User, params } = this.props;
    User = User || {};
    const main = data ? <Home data={data} tabIndex={tabIndex} tab={this.tab} /> :
      <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    const title = params.loginname === User.loginname ? '个人中心' : `${params.loginname}的个人中心`;
    const footer = params.loginname === User.loginname ? <Footer index="3" /> : null;
    const leftIcon = params.loginname === User.loginname ? null : 'fanhui';
    const rightIcon = params.loginname === User.loginname ? 'tuichu' : null;
    return (
      <div>
        <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
        {main}
        {footer}
      </div>
    );
  }
}

export default GetData({
  id: 'UserView',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: (props, state) => `/api/v1/user/${props.params.loginname}`,
  data: {},
  success: state => state, // 请求成功后执行的方法
  error: state => state, // 请求失败后执行的方法
});
