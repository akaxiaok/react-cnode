/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React from 'react';

/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export default function DataLoad(props = { loadAnimation: true, loadMsg: '正在加载中' }) {
  const { loadAnimation, loadMsg } = props;
  return (
    <div className={`data-load data-load-${loadAnimation}`} >
      <div className="msg" >{loadMsg}</div>
    </div>
  );
}
