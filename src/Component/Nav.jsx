/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import history from '../Config/history';
/**
 * (导航分类)
 *
 * @class Nav
 * @extends {Component}
 */
export default class Nav extends Component {
  shouldComponentUpdate(np) {
    return this.props.tab !== np.tab; // tab和之前的不一致，组件才需要更新，否则不更新，提升性能
  }

  handleChange = (value) => {
    switch (value) {
      case 'all':
        history.push('/');
        break;
      default :
        history.push(`/?tab=${value}`);
        break;
    }
  }

  render() {
    return (
      <nav className="index-nav" >
        <Tabs value={this.props.tab} className="tabs" onChange={this.handleChange} >
          <Tab label="全部" value="all" />
          <Tab label="精华" value="good" />
          <Tab label="分享" value="share" />
          <Tab label="问答" value="ask" />
          <Tab label="招聘" value="job" />
          <Tab label="测试" value="dev" />
        </Tabs>
      </nav>
    );
  }
}
