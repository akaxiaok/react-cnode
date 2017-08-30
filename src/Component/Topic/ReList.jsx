/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import Reply from './Reply';

/**
 * 回复列表
 *
 * @class ReList
 * @extends {Component}
 */
export default function ReList(props) {
  return (
    <ul className="re-list" >
      {
        props.page.replies.map((item, index) => (
          <Reply
            key={item.id}
            index={index}
            item={item}
            {...props}
          />
          ))
      }
    </ul >
  );
}
