/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/2.
 */
import React from 'react';

/**
 * 生成主题类型小图标
 *
 * @export
 * @class tabIcon
 * @extends {Component}
 */
export default function TabIcon(props) {
  let { tab } = props;
  const { top, good } = props;
  if (top) {
    tab = 'top';
  } else if (good) {
    tab = 'good';
  }
  return (
    <i className={`iconfont icon-${tab}`} />
  );
}
