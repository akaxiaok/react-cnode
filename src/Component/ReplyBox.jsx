/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { Tool } from '../Tool';
/**
 * 回复框
 *
 * @class ReplyBox
 * @extends {Component}
 */
export default class ReplyBox extends Component {
  constructor(props) {
    super(props);
    this.state = { btnname: '回复' };

    /**
     * 提交回复
     *
     * @returns
     */
    this.submit = () => {
      this.state = { btnname: '提交中...' };
      const data = this.props.data;
      if (data.reply_id) {
        data.content = `[@${this.props.loginname}](/user/${this.props.loginname}) ${this.content.value}`;
      } else {
        data.content = this.content.value;
      }
      if (!data.content) {
        return alert('回复内容不能为空！');
      }
      data.content += '-----from------';
      this.props.replayTopic(data);
      return true;
    };
  }

  render() {
    return (
      <div className="reply-box" style={{ display: this.props.display }} >
        <div className="text" ><textarea ref={ref => (this.content = ref)} placeholder={this.props.placeholder} /></div>
        <div data-flex="main:right" >
          <button className="btn" onClick={this.submit} >{this.state.btnname}</button>
        </div>
      </div>
    );
  }
}

ReplyBox.defaultProps = {
  display: 'block',
  placeholder: '回复支持Markdown语法,请注意标记代码',
};
