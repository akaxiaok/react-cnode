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


  }

  render() {
    const accesstoken = this.props.User ? this.props.User.accesstoken : '';
    return (
      <ul className="re-list" >
        {
          this.props.page.replies.map((item, index) => {
            return (
              <Reply accesstoken={accesstoken}  key={item.id} index={index}
                     item={item} {...this.props}/>
            );
          })
        }
      </ul>
    );
  }
}