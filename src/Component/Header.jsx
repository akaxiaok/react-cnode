/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export default  function Header(props, context) {
  const { title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = props;
  let left = null;

  if (leftTo && leftIcon) {
    left = (
      <Link to={leftTo} >
        <i className={`iconfont icon-${leftIcon}`} />
      </Link>
    );
  } else if (leftIcon === 'back') { // 返回上一页
    left = (
      <a onClick={browserHistory.goBack} >
        <i className={`iconfont icon-${leftIcon}`} />
      </a>
    );
  }

  let right = null;
  if (rightTo && rightIcon) {
    right = (
      <Link to={rightTo} >
        <i className={`iconfont icon-${rightIcon}`} />
      </Link>
    );
  } else if (rightClick && rightIcon) {
    right = (
      <div onClick={rightClick} >
        <i className={`iconfont icon-${rightIcon}`} />
      </div>
    );
  }
  return (
    <header className="common-header" style={{ backgroundColor: context.muiTheme.palette.primary1Color }} data-flex >
      <div className="icon" data-flex="main:center cross:center" data-flex-box="0" >
        {left}
      </div>
      <h2 className="title" data-flex-box="1" >{title}</h2>
      <div className="icon" data-flex="main:center cross:center" data-flex-box="0" >
        {right}
      </div>
    </header>
  );
}
Header.contextTypes = { muiTheme: PropTypes.object.isRequired, };