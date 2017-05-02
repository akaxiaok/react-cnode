/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import { DataLoad, Header, TipMsgSignin, Footer, GetData } from './common/index';
import UserHeadImg from './UserHeadImg';

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
      main = <TipMsgSignin />;
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

/**
 * 消息内容
 *
 * @class Content
 * @extends {Component}
 */
class Content extends Component {
  render() {
    const list = this.props.list;
    return (
      <div className="msg-box">
        <ul className="list">
          {
                        list.map((item, index) => {
                          const { type, author, topic, reply, has_read } = item;
                          let content = null;

                          if (type === 'at') {
                            content = <div>在话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link>中 @了你</div>;
                          } else {
                            content = <div>回复你了的话题<Link to={`/topic/${topic.id}`}>{topic.title}</Link></div>;
                          }
                          return (
                            <li data-flex="box:first" key={index}>
                              <Link className="user" to={`/user/${author.loginname}`}>
                                <UserHeadImg url={author.avatar_url} />
                              </Link>
                              <div>
                                <div className="name">{author.loginname}
                                  <time>{Tool.formatDate(reply.create_at)}</time>
                                </div>
                                <div data-flex="box:first">
                                  <div data-flex="cross:center">
                                    <div className={`dian-${has_read}`} />
                                  </div>
                                  {content}
                                </div>
                              </div>
                            </li>
                          );
                        })
                    }
        </ul>
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
