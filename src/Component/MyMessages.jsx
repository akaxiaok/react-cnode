/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { DataLoad, Header, Footer, GetData } from './common/index';
import TipMsgSignIn from './TipMsgSignIn';
import Content from './Content';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  render() {
    const { data, loadAnimation, loadMsg } = this.props.state;
    const { User } = this.props;
    let main = null;
    if (!User) {
      main = <TipMsgSignIn />;
    } else if (!data) {
      main = <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    } else {
      const { hasnot_read_messages, has_read_messages } = data;
      Array.prototype.push.apply(hasnot_read_messages, has_read_messages);
      main = <Content list={hasnot_read_messages} />;
    }

    return (
      <div>
        <Header title="消息" />
        {main}
        <Footer index="2" />
      </div>
    );
  }
}
export default GetData({
  id: 'MyMessages',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: '/api/v1/messages', // 服务器请求的地址
  stop: (props, state) => !props.User, // true 拦截请求，false不拦截请求
  data: (props, state) =>  // 发送给服务器的数据
         ({ accesstoken: props.User.accesstoken }),
  success: state => state, // 请求成功后执行的方法
  error: state => state, // 请求失败后执行的方法
});
