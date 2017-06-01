/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Tool } from '../Tool';
import GetData from './GetData';
import Article from './Article';
import DataLoad from './DataLoad';
import Header from './Header';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);

    /**
     * 点赞或取消赞
     *
     * @param {String} id
     * @param {Number} index
     * @param {String} loginname
     */
    this.clickZan = (id, index, loginname) => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      const uid = this.props.User ? this.props.User.id : '';
      if (!accesstoken) {
        return browserHistory.push({ pathname: '/signin' }); // 跳转到登录
      } else if (this.props.User.loginname === loginname) {
        return alert('你不能给自己点赞');
      }

      Tool.post(`/api/v1/reply/${id}/ups`, { accesstoken }, (res) => {
        const ups = this.props.state.data.replies[index - 1].ups;
        if (res.action === 'down') { // 取消点赞
          for (let i = 0; i < ups.length; i++) {
            if (ups[i] === uid) {
              ups.splice(i, 1);
            }
          }
        } else {
          ups.push(uid);
        }
        this.props.setState(this.props.state);
      });
    };

    /**
     * 显示回复框
     *
     * @param {String} index
     */
    this.showReplyBox = (index) => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      if (!accesstoken) {
        return browserHistory.push({ pathname: '/signin' }); // 跳转到登录
      }
      --index;
      if (this.props.state.data.replies[index].display === 'block') {
        this.props.state.data.replies[index].display = 'none';
      } else {
        this.props.state.data.replies[index].display = 'block';
      }

      this.props.setState(this.props.state);
    };
    /**
     * 回复成功后，重新加载数据
     *
     * @param {Object} data
     */
    this.reLoadData = (data) => {
      this.props.state.data = data;
      this.props.setState(this.props.state);
    };
  }

  render() {
    const { loadAnimation, loadMsg } = this.props.status;
    const data = this.props.page;
    const main = data ? (<Article
      {...this.props} reLoadData={this.reLoadData} clickZan={this.clickZan}
      showReplyBox={this.showReplyBox}
    />) : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    return (
      <div>
        <Header title="详情" leftIcon="fanhui" />
        {main}
      </div>
    );
  }
}


export default GetData({
  id: 'Topic',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: (props) => `/api/v1/topic/${props.params.id || ''}`,
  data: (props, state) => { // 发送给服务器的数据
    const accesstoken = props.User ? props.User.accesstoken : '';
    return { mdrender: state.mdrender, accesstoken };
  },
  success: state => state, // 请求成功后执行的方法
  error: state => state, // 请求失败后执行的方法
});
