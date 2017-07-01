/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import DataLoad from './DataLoad';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import action from '../Action/Action';


const setting = {
  id: 'UserView',  // 应用关联使用的redux
  url: props => `/api/v1/user/${props.params.loginname}`,
  stop: props => props.data,
};


class Main extends Component {
  constructor(props) {
    super(props);
    this.switchTab = (tabIndex) => {
      this.props.switchTab(tabIndex);
    };

    if (!props.user) {
      browserHistory.push('/');
    }
    this.redayDOM = () => {
      // if (this.get) return false; // 已经加载过
      if (this.testStop()) return false; // 请求被拦截
      this.props.getUserView({
        url: this.props.setting.url(this.props),
      });
      return true;
    };
    this.testStop = () => {
      const { stop } = this.props.setting;
      if (typeof stop === 'function') {
        return stop(this.props);
      }
      return stop;
    };
  }

  componentDidMount() {
    this.redayDOM();
  }


  render() {
    const { loadAnimation, loadMsg, tabIndex } = this.props.status;
    const data = this.props.data;
    let { user, params } = this.props;
    user = user || {};
    const main = data ? <Home data={data} tabIndex={tabIndex} tab={this.switchTab} /> :
      <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    const title = params.loginname === user.loginname ? '个人中心' : `${params.loginname}的个人中心`;
    const footer = params.loginname === user.loginname ? <Footer index={3} /> : null;
    const leftIcon = params.loginname === user.loginname ? null : 'fanhui';
    const rightIcon = params.loginname === user.loginname ? 'tuichu' : null;
    return (
      <div>
        <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
        <div className="vertical-margin" >
          {main}
        </div>
        {footer}
      </div>
    );
  }

}
Main.defaultProps = { setting };

export default connect(state =>
    ({ status: state[setting.id].status, data: state[setting.id].data, user: state.User }),
  action(setting.id))(Main); // 连接redux
