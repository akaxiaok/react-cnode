/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import Reply from './Reply';

/**
 * 回复列表
 *
 * @class ReList
 * @extends {Component}
 */
export default class ReList extends Component {
  constructor(props) {
    super(props);

    /**
     * 验证回复项目是否点赞
     *
     * @param {Array} arr
     * @returns
     */
    this.isUp = (arr) => {
      const id = this.props.User ? this.props.User.id : '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === id) return true;
      }
      return false;
    };

  }

  render() {
    const accesstoken = this.props.User ? this.props.User.accesstoken : '';
    return (
      <ul className="re-list" >
        {
          this.props.list.map((item, index) => {
            return (
              <Reply accesstoken={accesstoken} isUp={this.isUp} key={item.id} index={index} item={item} {...this.props}/>
            );
          })
        }
      </ul>
    );
  }
}