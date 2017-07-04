/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import TabIcon from './TabIcon';
import UserHeadImg from './UserHeadImg';
import TipMsgSignIn from './TipMsgSignIn';
import ReplyBox from './ReplyBox';
import ReList from './ReList';

/**
 * 文章主体部分
 *
 * @class Article
 * @extends {Component}
 */
export default class Article extends Component {
  render() {
    const { id, title, create_at, visit_count, reply_count, content, replies, author } = this.props.page;

    const createMarkup = () => ({
      __html: content,
    });
    const bottom = this.props.User ?
      <ReplyBox replyTopic={this.props.replyTopic} data={{ accesstoken: this.props.User.accesstoken, id }} /> :
      <TipMsgSignIn />;

    return (
      <div className="topic" >
        <div className="user" data-flex >
          <div className="headimg" data-flex-box="0" >
            <UserHeadImg url={author.avatar_url} />
          </div>
          <div className="data" data-flex="dir:top" data-flex-box="1" >
            <div data-flex="main:justify" >
              <Link to={`/user/${author.loginname}`} className="name" >{author.loginname}</Link>
              <time data-flex-box="1" >{Tool.formatDate(create_at)}</time>
              <div className="font" data-flex="main:center cross:center" >
                <TabIcon {...this.props.page} /></div>
            </div>
            <div className="qt" data-flex >
              <div>阅读：{visit_count}</div>
              <div>回复：{reply_count}</div>
            </div>
          </div>
        </div>
        <h2 className="tit2" >{title}</h2>
        <div className="content markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        <h3 className="tit3" >共<em>{replies.length}</em>条回复</h3>
        <ReList
          replyTopic={this.props.replyTopic} id={id} list={replies} clickZan={this.props.clickZan}
          User={this.props.User}
        />
        {bottom}
      </div>
    );
  }
}
