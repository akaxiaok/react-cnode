/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import UserHeadImg from './UserHeadImg';

/**
 * 消息内容
 *
 * @class Content
 * @extends {Component}
 */
export default class Content extends Component {
  render() {
    const list = this.props.list;
    return (
      <div className="msg-box" >
        <ul className="list" >
          {
            list.map((item, index) => {
              const { type, author, topic, reply, has_read } = item;
              let content = null;

              if (type === 'at') {
                content = <div>在话题<Link to={`/topic/${topic.id}`} >{topic.title}</Link>中 @了你</div>;
              } else {
                content = <div>回复你了的话题<Link style={{ color: this.context.muiTheme.palette.primary1Color }}
                                            to={`/topic/${topic.id}`} >{topic.title}</Link></div>;
              }
              return (
                <li data-flex="box:first" key={index} >
                  <Link className="user" to={`/user/${author.loginname}`} >
                    <UserHeadImg url={author.avatar_url} />
                  </Link>
                  <div>
                    <div className="name" >{author.loginname}
                      <time>{Tool.formatDate(reply.create_at)}</time>
                    </div>
                    <div data-flex="box:first" >
                      <div data-flex="cross:center" >
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
Content.contextTypes = { muiTheme: PropTypes.object.isRequired, };