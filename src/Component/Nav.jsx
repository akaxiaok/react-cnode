/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
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
  render() {
    const setCur = {};
    setCur[this.props.tab] = 'on';
    return (
      <nav className="index-nav">
        <ul data-flex="box:mean">
          <li className={setCur.all}>
            <Link to="/" activeClassName="active">全部</Link>
          </li>
          <li className={setCur.good}>
            <Link to="/?tab=good" activeClassName="active">精华</Link>
          </li>
          <li className={setCur.share}>
            <Link to="/?tab=share" activeClassName="active">分享</Link>
          </li>
          <li className={setCur.ask}>
            <Link to="/?tab=ask" activeClassName="active">问答</Link>
          </li>
          <li className={setCur.job}>
            <Link to="/?tab=job" activeClassName="active">招聘</Link>
          </li>
        </ul>
        <div className="height" />
      </nav>
    );
  }
}
