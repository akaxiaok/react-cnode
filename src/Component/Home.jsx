/**
 * Created by Kimi on 2017/5/3.
 */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { Tool } from '../Tool';
import UserHeadImg from './UserHeadImg';
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
        <div className="headimg" data-flex="dir:top main:center cross:center" >
          <UserHeadImg url={avatar_url} />
          <div className="name" >{loginname}</div>
          <div className="score" >积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            注册于：{Tool.formatDate(create_at)}</div>
        </div>
        <ul className="tab-nav" data-flex="box:mean" >
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
