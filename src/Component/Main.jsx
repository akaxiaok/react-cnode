/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import List from './List';
import DataLoad from './DataLoad';

/**
 * (导出组件)
 *
 * @export
 * @class Main
 * @extends {Component}
 */
export default class Main extends Component {
  componentDidMount() {
    this.props.scrollListen(this.dataLoad, this.content);
  }

  render() {
    const list = this.props.list;
    const tab = this.props.tab || 'all';
    return (
      <div className="index-list-box flex flex-direction-column" >
        <Nav tab={tab} />
        <div ref={content => (this.content = content)} className="flex-grow-1 scroll-content index-content" >
          {
            list && list.length > 0 ? <List list={list} /> : null
          }
          <div ref={dataLoad => (this.dataLoad = dataLoad)} >
            <DataLoad {...this.props} />
          </div >
        </div >
      </div >
    );
  }
}
Main.propTypes = {
  scrollListen: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  tab: PropTypes.string.isRequired,
};

