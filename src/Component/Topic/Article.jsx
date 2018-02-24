/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreaterHeader from './CreaterHeader';
import TipMsgSignIn from '../TipMsgSignIn';
import ReplyBox from './ReplyBox';
import ReList from './ReList';

/**
 * 文章主体部分
 *
 * @class Article
 * @extends {Component}
 */
export default class Article extends Component {
  replyTopic = (data) => {
    const reply = Object.assign({}, data);
    reply.id = this.props.page.id;
    reply.accesstoken = this.props.User.accesstoken;
    this.props.replyTopic(reply);
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const { id, title, content, replies } = this.props.page;
    const createMarkup = () => ({
      __html: content,
    });
    const bottom = this.props.User ?
      (<ReplyBox
        rows={10} multi replyTopic={this.replyTopic}
        id={id}
      />) :
      <TipMsgSignIn />;
    return (
      <div className="topic" >
        <h2
          style={{
            padding: '10px',
            fontSize: '1em',
            background: palette.canvasColor,
            textAlign: 'center',
          }}
        >{title}</h2 >
        <CreaterHeader {...this.props.page} />
        <div className="content markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        <h3 className="tit3" style={{ borderColor: palette.primary1Color }} >共<em
          style={{ color: palette.primary1Color }}
        >{replies.length}</em >条回复</h3 >
        <ReList
          page={this.props.page}
          isUp={this.props.isUp}
          like={this.props.like}
          replyTopic={this.replyTopic}
        />
        {bottom}
      </div >
    );
  }
}
Article.contextTypes = { muiTheme: PropTypes.object.isRequired };
