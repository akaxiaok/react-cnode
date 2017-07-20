/**
 * Created by Kimi on 2017/6/29.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import { Tool } from '../../Tool';
import ReplyBox from '../ReplyBox';
import Like from '../Like';

export default class Reply extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { display: 'none' };
  }

  showReplyBox = () => {
    this.setState({ display: 'block' });
  };

  replyComment = (data) => {
    this.props.replyTopic(data);
    this.setState({ display: 'none' });
  }

  render() {
    const { id, content, author, ups, create_at } = this.props.item;
    let index = this.props.index;
    const upState = this.props.isUp(ups);
    const createMarkup = () => ({
      __html: content,
    })
    const avatarStyle = {
      margin: '10px',
      background: this.context.muiTheme.palette.primary1Color,
      width: '40px',
      height: '40px',
    };
    return (
      <li className="flex" >
        <Avatar src={author.avatar_url} style={avatarStyle} />
        <div className="main flex-grow-1" >
          <div className="flex" >
            <Link
              to={`/user/${author.loginname}`}
              className="name"
            >{author.loginname}</Link>
            <time className="flex-grow-1" >{Tool.formatDate(create_at)}</time>
            <div className="lou" >#{++index}</div>
          </div>
          <div
            className="content markdown-body"
            dangerouslySetInnerHTML={createMarkup()}
          />
          <div className="bottom flex justify-content-flex-end" >
            <Like likes={ups.length} liked={upState} onLike={() => {
              return this.props.like(id, author.loginname)
            }} />
            <div
              className="font" onClick={() => {
              this.showReplyBox();
            }}
            >
              <i className="iconfont icon-reply" />
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
Reply.contextTypes = { muiTheme: PropTypes.object.isRequired, };