/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import { DataLoad, Header, Footer, UserHeadImg, GetData } from './common/index';

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
    const title = params.loginname == User.loginname ? '个人中心' : `${params.loginname}的个人中心`;
    const footer = params.loginname == User.loginname ? <Footer index="3" /> : null;
    const leftIcon = params.loginname == User.loginname ? null : 'fanhui';
    const rightIcon = params.loginname == User.loginname ? 'tuichu' : null;
    return (
      <div>
        <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
        {main}
        {footer}
      </div>
    );
  }
}


/**
 * 个人主页
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  render() {
    const { avatar_url, loginname, score, recent_topics, recent_replies, create_at } = this.props.data;
    const { tabIndex } = this.props;
    const arrOn = [];
    const arrDisplay = [];
    arrOn[tabIndex] = 'on';
    arrDisplay[tabIndex] = 'block';
    return (
      <div className="user-index">
        <div className="headimg" data-flex="dir:top main:center cross:center">
          <UserHeadImg url={avatar_url} />
          <div className="name">{loginname}</div>
          <div className="score">积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        注册于：{Tool.formatDate(create_at)}</div>
        </div>
        <ul className="tab-nav" data-flex="box:mean">
          <li
            onClick={() => {
              this.props.tab(0);
            }} className={arrOn[0]}
          >主题
                    </li>
          <li
            onClick={() => {
              this.props.tab(1);
            }} className={arrOn[1]}
          >回复
                    </li>
        </ul>
        <HomeList list={recent_topics} display={arrDisplay[0]} />
        <HomeList list={recent_replies} display={arrDisplay[1]} />
      </div>
    );
  }
}

/**
 * 发布的主题和回复的主题列表
 *
 * @class HomeList
 * @extends {Component}
 */
class HomeList extends Component {
  render() {
    const { list, display } = this.props;
    return (
      <ul className="list" style={{ display }}>
        {
                    list.map((item, index) => {
                      const { id, title, last_reply_at } = item;
                      return (
                        <li key={index}>
                          <Link data-flex="box:last" to={`/topic/${id}`}>
                            <div className="tit">{title}</div>
                            <time className>{Tool.formatDate(last_reply_at)}</time>
                          </Link>
                        </li>
                      );
                    })
                }
      </ul>
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
