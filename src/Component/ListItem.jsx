/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import UserHeadImg from './UserHeadImg';
import TabIcon from './TabIcon';

export default class ListItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { id, title, author, visit_count, reply_count, create_at, last_reply_at } = this.props;
    return (
      <li>
        <Link to={`/topic/${id}`} >
          <div data-flex="box:first" >
            <div className="font" data-flex="cross:center" ><TabIcon {...this.props} /></div>
            <h3 className="tit" >{title}</h3>
          </div>
          <div className="bottom" data-flex="box:first" >
            <div className="author" data-flex="cross:center" >
              <UserHeadImg url={author.avatar_url} />
            </div>
            <div className="con" data-flex="dir:top main:center" >
              <p data-flex="cross:center box:last" >
                <span className="name" >{author.loginname}</span>
                <span className="count" >{reply_count}/{visit_count}</span>
              </p>
              <p data-flex="cross:center box:last" >
                <time className="create" >{Tool.formatDate(create_at)}</time>
                <time className="re" >{Tool.formatDate(last_reply_at)}</time>
              </p>
            </div>
          </div>
        </Link>
      </li>
    );
  }


}
