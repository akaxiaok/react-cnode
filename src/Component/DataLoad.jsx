/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export default function DataLoad(props = { loadAnimation: true, loadMsg: '正在加载中' },context) {
  const { loadAnimation, loadMsg } = props;
  return (
    <div className={`data-load data-load-${loadAnimation}`}
         style={{
           borderColor: context.muiTheme.palette.primary1Color, borderRightColor: 'transparent'
         }} >
      <div className="msg" >{loadMsg}</div>
    </div>
  );
}
DataLoad.contextTypes = { muiTheme: PropTypes.object.isRequired, };