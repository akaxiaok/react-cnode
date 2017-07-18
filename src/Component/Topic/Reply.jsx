/**
 * Created by Kimi on 2017/6/29.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../../Tool';
import ReplyBox from '../ReplyBox';
import UserHeadImg from '../UserHeadImg';
import Like from '../Like';

export default class ReList extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 'none' };
    /**
     * 显示回复框
     *
     * @param {String} index
     */
    this.showReplyBox = () => {
      this.setState({ display: 'block' });
    };
    this.replyComment = (data) => {
      this.props.replyTopic(data);
      this.setState({ display: 'none' });
    }
  }


  render() {
    const { id, content, author, ups, create_at } = this.props.item;
    const display = 'none';
    let index = this.props.index;
    const at = new Date(create_at);
    const upState = this.props.isUp(ups);
    const createMarkup = () => ({
      __html: content,
    })
    return (

      <li data-flex >
        <div className="headimg" data-flex-box="0" >
          <UserHeadImg url={author.avatar_url} />
        </div>
        <div className="main" data-flex-box="1" >
          <div data-flex="main:justify" >
            <Link
              to={`/user/${author.loginname}`}
              className="name"
            >{author.loginname}</Link>
            <time data-flex-box="1" >{Tool.formatDate(create_at)}</time>
            <div className="lou" >#{++index}</div>
          </div>
          <div
            className="content markdown-body"
            dangerouslySetInnerHTML={createMarkup()}
          />
          <div className="bottom" data-flex="main:right" >
            <Like likes={ups.length} liked={upState} onLike={() => {
              return this.props.like(id, author.loginname)
            }} />
            <div
              className="font" onClick={() => {
              this.showReplyBox();
            }}
            >
              <i className="iconfont icon-huifu" />
            </div>
          </div>
          <ReplyBox
            placeholder={`@${author.loginname}`} replyTopic={this.replyComment}
            display={this.state.display} loginname={author.loginname}
            data={{ accesstoken: this.props.accesstoken, id: this.props.page.id, reply_id: id }}
          />
        </div>
      </li>
    )
  }
}