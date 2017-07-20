/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { Tool } from '../../Tool';
import Article from './Article';
import DataLoad from '../DataLoad';
import Header from '../Header';
import action from '../../Action/Action';


const setting = {
  id: 'Topic',  // 应用关联使用的redux
  type: 'GET', // 请求类型
  // stop: props => !props.data,  // stop 函数 防止二次请求
  data: (props, state) => { // 发送给服务器的数据
    const accesstoken = props.User ? props.User.accesstoken : '';
    return { mdrender: state.mdrender, accesstoken };
  },

};
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.params.id;
    /**
     * 初始化状态
     *
     * @param {Object} props
     */
    this.initState = (props) => {
      const { location } = props;
      const { pathname, search } = location;
      this.path = pathname + search;
    };

    /**
     * DOM初始化完成后执行回调
     */
    this.redayDOM = () => {
      const { scrollX, scrollY } = this.props.status;
      if (this.get) return false; // 已经加载过
      window.scrollTo(scrollX, scrollY); // 设置滚动条位置
      if (this.testStop()) return false; // 请求被拦截

      this.get = true;
      const { mdrender, accesstoken } = setting.data(this.props, this.props.status);
      this.props.get({
        id: this.id,
        mdrender,
        accesstoken,
      });
    };
    /**
     * 组件卸载前执行一些操作
     */
    this.unmount = () => {
      if (typeof this.get !== 'undefined') {
        delete this.get;
      }
    };
    /**
     * 是否要拦截请求
     *
     * @returns
     */
    this.testStop = () => {
      const { stop } = this.props.setting;
      if (typeof stop === 'function') {
        return stop(this.props, this.state);
      }
      return stop;
    };
    this.initState(this.props);
    /**
     * 点赞或取消赞
     *
     * @param {String} id
     * @param {String} loginname
     */
    this.like = (id, loginname) => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      const uid = this.props.User ? this.props.User.id : '';
      if (!accesstoken) {
        browserHistory.push({ pathname: '/signin' }); // 跳转到登录
        return false;
      } else if (this.props.User.loginname === loginname) {
        alert('你不能给自己点赞')
        return false;
      }
      const payload = {
        accesstoken
      };
      fetch(`/api/v1/reply/${id}/ups`, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
      }).catch(err => {
          console.log(err);
          return false;
        }
      );
      return true;
    };
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

    /**
     * 回复成功后，重新加载数据
     *
     * @param {Object} data
     */
    this.replyTopic = (data) => {
      this.props.replyTopic(data);
    };
  }


  /**
   * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
   * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
   * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
   */
  componentDidMount() {
    this.redayDOM();
  }

  /**
   * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
   */
  componentWillReceiveProps(np) {
    const { location } = np;
    const { pathname, search } = location;
    const path = pathname + search;
    if (this.path !== path) {
      this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
    }

    this.initState(np);
  }

  /**
   * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
   * 使用该方法可以在组件更新之后操作 DOM 元素。
   */
  componentDidUpdate() {
    this.redayDOM();
  }

  /**
   * 在组件从 DOM 中移除的时候立刻被调用。
   * 在该方法中执行任何必要的清理，比如无效的定时器，
   * 或者清除在 componentDidMount 中创建的 DOM 元素
   */
  componentWillUnmount() {
    this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
  }

  render() {
    const { loadAnimation, loadMsg } = this.props.status;
    const data = this.props.pages[this.id];
    const main = data ? (<Article
      User={this.props.User} page={data} replyTopic={this.replyTopic} isUp={this.isUp} like={this.like}
      showReplyBox={this.showReplyBox}
    />) : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    return (
      <div>
        <Header title="详情" leftIcon="back" />
        <div className="vertical-margin scroll-content topic-content" >
          {main}
        </div>
      </div>
    );
  }
}
Main.defaultProps = { setting };


export default connect(state => ({
  status: state[setting.id].status,
  User: state.User,
  pages: state[setting.id].pages,
}), action(setting.id))(Main);
