/**
 * Created by Kimi on 2017/4/25.
 */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ListItem from './ListItem';
/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */

export default class List extends Component {
  render() {
    return (
      <ul className="index-list">
        {this.props.list.map(item => <ListItem key={item.id} {...item} />)}
      </ul>
    );
  }
}
