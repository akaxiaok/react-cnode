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
  componentDidMount(){
    this.props.scrollListen(this.dataLoad);
  }
  render() {
    const data = this.props.data;
    const tab = this.props.tab || 'all';
    const { loadAnimation, loadMsg } = this.props;
    return (
      <div className="index-list-box" >
        <Nav tab={tab} />
        <div className="vertical-margin scroll-content" >
          {
            data && data.lists.length > 0 ? <List list={data.lists} /> : null
          }
          <div ref={dataLoad => (this.dataLoad = dataLoad)} >
            <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
          </div>
        </div>
        <Footer index={0} />
      </div>
    );
  }
}
