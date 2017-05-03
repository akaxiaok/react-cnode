/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import GetData from './GetData';
import GetNextPage from './GetNextPage';

export { GetData, GetNextPage };


/**
 * 暂无记录
 *
 * @export
 * @class DataNull
 * @extends {Component}
 */
export class DataNull extends Component {
  render() {
    return (
      <div>暂无记录</div>
    );
  }
}

