/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import Nav from './Nav';
import List from './List';
import Footer from './Footer';
import DataLoad from './DataLoad';

/**
 * (导出组件)
 *
 * @export
 * @class Main
 * @extends {Component}
 */
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.scrollListen(this.dataLoad, this.content);
  }

  render() {
    const data = this.props.data;
    const tab = this.props.tab || 'all';
    const { loadAnimation, loadMsg } = this.props;
    return (
      <div className="index-list-box flex flex-direction-column" >
        <Nav tab={tab} />
        <div ref={content => (this.content = content)} className="flex-grow-1 scroll-content index-content" >
          {
            data && data.lists.length > 0 ? <List list={data.lists} /> : null
          }
          <div ref={dataLoad => (this.dataLoad = dataLoad)} >
            <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
          </div>
        </div>
      </div>
    );
  }
}
