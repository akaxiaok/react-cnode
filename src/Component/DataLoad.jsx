/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
function DataLoad(props = { loadAnimation: true, loadMsg: '正在加载中' }) {
  const { loadAnimation, loadMsg } = props;
  return (
    <div className={`data-load data-load-${loadAnimation}`}
         style={{
           borderColor: props.muiTheme.palette.primary1Color, borderRightColor: 'transparent'
         }} >
      <div className="msg" >{loadMsg}</div>
    </div>
  );
}
export default muiThemeable()(DataLoad);