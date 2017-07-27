/**
 * Created by Kimi on 2017/7/17.
 */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TabIcon from '../TabIcon';
import { Tool } from '../../Tool';

export default function CreaterHead(props, context) {
// eslint-disable-next-line react/prop-types
  const { create_at, visit_count, author } = props;
  const palette = context.muiTheme.palette;
  return (
    <div className="creater-head" >
      <div >
        <Avatar
          src={author.avatar_url}
          size={60}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <Link
          to={`/user/${author.loginname}`}
          style={{ fontSize: '1.5em', color: palette.primary1Color }}
        >{author.loginname}</Link >
      </div >
      <div style={{ marginLeft: '1em' }} >
        <time style={{ color: palette.secondaryTextColor }} >{Tool.formatDate(create_at)}</time >
        <p style={{ fontSize: '1.2em' }} >阅读：{visit_count}</p >
      </div >
      <div
        style={{
          alignSelf: 'center', marginLeft: 'auto',
        }}
      >
        <TabIcon {...props} style={{ fontSize: '5em', color: '#fff' }} />
      </div >
    </div >
  );
}

CreaterHead.contextTypes = { muiTheme: PropTypes.object.isRequired };
