/**
 * Created by Kimi on 2017/5/3.
 */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import { Tool } from '../Tool';
import HomeList from './HomeList';

/**
 * 个人主页
 *
 * @class Home
 * @extends {Component}
 */
export default class Home extends Component {
  render() {
    const { avatar_url, loginname, score, recent_topics, recent_replies, create_at } = this.props.data;
    const { tabIndex } = this.props;
    const arrOn = [];
    const arrDisplay = [];
    arrOn[tabIndex] = 'on';
    arrDisplay[tabIndex] = 'block';
    return (
      <div className="user-index" >
        <div className="headimg flex justify-content-center align-items-center flex-direction-column"
             style={{ backgroundColor: this.context.muiTheme.palette.primary1Color, }} >
          <Avatar style={{width:'80px',height:'80px'}} src={avatar_url} />
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

Home.contextTypes = { muiTheme: PropTypes.object.isRequired, };