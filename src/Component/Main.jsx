/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import Nav from './Nav';
import List from './List';
import { Footer } from './common/index';
/**
 * (导出组件)
 *
 * @export
 * @class Main
 * @extends {Component}
 */
export default class Main extends Component {
  render() {
    const { data } = this.props.state;
    const tab = this.props.location.query.tab || 'all';
    return (
      <div className="index-list-box">
        <Nav tab={tab} />
        {
          data.length > 0 ? <List list={data} /> : null
        }
        <Footer index="0" />
      </div>
    );
  }
}
