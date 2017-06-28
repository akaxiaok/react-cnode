/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
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
        browserHistory.push('/');
        break;
      default :
        browserHistory.push(`/?tab=${value}`);
        break;
    }
  }

  render() {
    return (
      <nav className="index-nav" >
        <Tabs value={this.props.tab} className='tabs' onChange={this.handleChange} >
          <Tab label="全部" value="all" />
          <Tab label="精华" value="good" />
          <Tab label="分享" value="share" />
          <Tab label="问答" value="ask" />
          <Tab label="招聘" value="job" />
        </Tabs>
      </nav>
    );
  }
}
