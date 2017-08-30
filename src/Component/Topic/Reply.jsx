/**
 * Created by Kimi on 2017/6/29.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Tool } from '../../Tool';
import ReplyBox from './ReplyBox';
import Like from '../Like';

export class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 'none' };
  }

  showReplyBox = () => {
    this.setState({ display: 'block' });
  };

  replyTopic = (data) => {
    const reply = Object.assign({}, data);
    reply.reply_id = this.props.item.id;
    reply.content = `[@${this.props.item.author.loginname}](/user/${this.props.item.author.loginname}) ${data.content}`;
    this.props.replyTopic(reply);
    this.setState({ display: 'none' });
  }

  render() {
    const { id, content, author, ups, create_at } = this.props.item;
    const index = this.props.index + 1;
    const upState = this.props.isUp(ups);
    const createMarkup = () => ({
      __html: content,
    });
    const avatarStyle = {
      margin: '10px',
      background: this.props.muiTheme.palette.primary1Color,
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
            >{author.loginname}</Link >
            <time className="flex-grow-1" >{Tool.formatDate(create_at)}</time >
            <div className="lou" >#{index}</div >
          </div >
          <div
            className="content markdown-body"
            dangerouslySetInnerHTML={createMarkup()}
          />
          <div className="bottom flex justify-content-flex-end" >
            <Like
              likes={ups.length} liked={upState} onLike={() =>
              this.props.like(id, author.loginname)}
            />
            <div
              className="font"
              onClick={() => {
                this.showReplyBox();
              }}
              role="button"
            >
              <i className="iconfont icon-reply" />
            </div >
          </div >
          <ReplyBox
            placeholder={`@${author.loginname}`} replyTopic={this.replyTopic}
            display={this.state.display}
          />
        </div >
      </li >
    );
  }
}

Reply.propTypes = {
  replyTopic: PropTypes.func.isRequired,
  isUp: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.objectOf(PropTypes.number).isRequired,
  muiTheme: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default muiThemeable()(Reply);
