/**
 * Created by Kimi on 2017/5/3.
 */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Tool } from '../Tool';
import UserHeadImg from './UserHeadImg';
import HomeList from './HomeList';

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
      <div className="user-index" >
        <div className="headimg" data-flex="dir:top main:center cross:center"
             style={{ backgroundColor: this.props.muiTheme.palette.primary1Color, }} >
          <UserHeadImg url={avatar_url} />
          <div className="name" >{loginname}</div>
          <div className="score" >积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            注册于：{Tool.formatDate(create_at)}</div>
        </div>
        <Tabs  >
          <Tab label="主题" > <HomeList list={recent_topics} /></Tab>
          <Tab label="回复" > <HomeList list={recent_replies} /></Tab>
        </Tabs>
      </div>
    );
  }
}
export default muiThemeable()(Home);