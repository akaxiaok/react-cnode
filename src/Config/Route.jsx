/* eslint-disable react/prop-types */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IndexList from '../Component/IndexList'; // 首页组件
import Topic from '../Component/Topic/Topic'; // 主题详情
import TopicCreate from '../Component/TopicCreate'; // 发布主题
import MyMessages from '../Component/MyMessages'; // 我的消息
import UserView from '../Component/UserView'; // 我的个人中心
import SignIn from '../Component/SignIn'; // 登录
import SignOut from '../Component/SignOut'; // 退出
import Footer from '../Container/Footer';

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
function Roots(props) {
  return (
    <div className="flex flex-direction-column">
      <div className="flex-grow-1">
      {props.children}
      </div>
      <Footer />
    </div>
  );
}
const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const RouteConfig = (
  <MuiThemeProvider>
    <Router history={history} >
      <Route path="/" component={Roots} >
        <IndexRoute component={IndexList} />
        <Route path="topic/create" component={TopicCreate} />
        <Route path="topic/:id" component={Topic} />
        <Route path="/messages" component={MyMessages} />
        <Route path="user/:loginname" component={UserView} />
        <Route path="signin" component={SignIn} />
        <Route path="signout" component={SignOut} />
      </Route>
    </Router>
  </MuiThemeProvider>

);

export default RouteConfig;

