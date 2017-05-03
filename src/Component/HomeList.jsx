/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';

/**
 * 发布的主题和回复的主题列表
 *
 * @class HomeList
 * @extends {Component}
 */
export default class HomeList extends Component {
  render() {
    const { list, display } = this.props;
    return (
      <ul className="list" style={{ display }} >
        {
          list.map((item, index) => {
            const { id, title, last_reply_at } = item;
            return (
              <li key={index} >
                <Link data-flex="box:last" to={`/topic/${id}`} >
                  <div className="tit" >{title}</div>
                  <time >{Tool.formatDate(last_reply_at)}</time>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
