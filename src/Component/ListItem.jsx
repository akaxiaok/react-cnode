/* eslint-disable react/prop-types,camelcase */
/**
 * Created by Kimi on 2017/4/25.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import { Tool } from '../Tool';
import TabIcon from './TabIcon';

export default class ListItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { id, title, author, visit_count, reply_count, create_at, last_reply_at } = this.props;
    return (
      <li >
        <Link to={`/topic/${id}`} >
          <div className="flex" >
            <div className="font flex align-items-center" ><TabIcon {...this.props} /></div >
            <h3 className="tit flex-grow-1" >{title}</h3 >
          </div >
          <div className="bottom flex" >
            <div className="author flex align-items-center" >
              <Avatar src={author.avatar_url} />
            </div >
            <div className="con flex-grow-1 flex-direction-column " >
              <p className="flex" >
                <span className="name flex-grow-1" >{author.loginname}</span >
                <span className="count" >{reply_count}/{visit_count}</span >
              </p >
              <p className="flex" >
                <time className="create flex-grow-1" >{Tool.formatDate(create_at)}</time >
                <time className="re" >{Tool.formatDate(last_reply_at)}</time >
              </p >
            </div >
          </div >
        </Link >
      </li >
    );
  }
}
