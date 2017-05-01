/**
 * Created by Kimi on 2017/4/25.
 */
/* eslint-disable react/prop-types */
import React from 'react';
import ListItem from './ListItem';
/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */

export default function (props) {
  return (
    <ul className="index-list" >
      {props.list.map(item => <ListItem key={item.id} {...item} />)}
    </ul>
  );
}
