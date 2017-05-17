/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React from 'react';
import Nav from './Nav';
import List from './List';
import Footer from './Footer';
/**
 * (导出组件)
 *
 * @export
 * @class Main
 * @extends {Component}
 */
export default function (props) {
  const { data } = props;
  const tab = props.defaults.tab || 'all';
  return (
    <div className="index-list-box" >
      <Nav tab={tab} />
      {
        data && data.length > 0 ? <List list={data} /> : null
      }
      <Footer index="0" />
    </div>
  );
}
