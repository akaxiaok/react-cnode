/* eslint-disable react/prop-types,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNextPage, setStatus, setScroll } from '../Action/Action';
import Main from './Main';

/**
 * 组件入口
 *
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  /**
   * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
   * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
   * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
   */
  componentDidMount() {
    this.readyDOM();
  }

  /**
   * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
   */
  componentWillReceiveProps(np) {
    const { location } = np;
    if (this.props.location === location) {
      return;
    }
    const { pathname, search } = location;
    const path = pathname + search;
    if (this.props.status.path !== path) {
      const serchTarget = search.split('=')[1];
      const tab = serchTarget === undefined ? 'all' : serchTarget;
      if (this.props.data) {
        this.props.setScroll(window.scrollX, window.scrollY); // 设置滚动条位置
      }
      this.props.setStatus({
        path,
        tab,
      });
      delete this.get;
    }
  }

  /**
   * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
   * 使用该方法可以在组件更新之后操作 DOM 元素。
   */
  componentDidUpdate(prevProps) {
    this.readyDOM();
    if (this.props.data && (this.props.status.path !== prevProps.status.path)) {
      const { scrollX, scrollY } = this.props.data.status;
      window.scrollTo(scrollX, scrollY); // 设置滚动条位置
    }
  }

  /**
   * 在组件从 DOM 中移除的时候立刻被调用。
   * 在该方法中执行任何必要的清理，比如无效的定时器，
   * 或者清除在 componentDidMount 中创建的 DOM 元素
   */
  componentWillUnmount() {
    delete this.get;
    this.unbind();
    // this.props.setScroll(window.scrollX, window.scrollY);
    // 地址栏已经发生改变，做一些卸载前的处理
  }

  initState = () => {
    const { pathname, search } = this.props.location;
    const path = pathname + search;
    if (this.props.status.path !== path) {
      const serchTarget = search.split('=')[1];
      const tab = serchTarget === undefined ? 'all' : serchTarget;
      this.props.setStatus({ path, tab });
      return false;
    }
    return true;
  };
  /**
   * DOM初始化完成后执行回调
   */
  readyDOM = () => {
    if (this.props.data) {
      return false;
    } // 已经加载过
    if (this.get) return false; // 已经加载过
    if (!this.initState()) return false;
    const data = this.props.status;


    try {
      this.get = true;
      this.props.getNextPage(data, 1);
    } catch (e) {
      throw new Error(e);
    }
    return true;
  };
  loadNextPage = () => {
    if (this.props.status.loadAnimation) return;
    const bcr = this.el.getBoundingClientRect(); // 取得元素在可视区的位置
    const displayHeight = window.innerHeight - bcr.bottom;
    if (displayHeight === 50) {
      this.props.getNextPage(this.props.status, this.props.data.status.page);
    }
  };
  scrollListener = (select, content) => {
    this.el = select;
    this.content = content;
    this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];
    this.bind();
  };
  bind = () => {
    // 事件绑定
    const eventList = this.monitorEvent;
    for (let i = 0; i < eventList.length; i += 1) {
      window.addEventListener(eventList[i], this.loadNextPage, false);
    }
  };
  unbind = () => {
    const eventList = this.monitorEvent;
    for (let i = 0; i < eventList.length; i += 1) {
      window.removeEventListener(eventList[i], this.loadNextPage, false);
    }
  };

  render() {
    return (
      <Main
        {...this.props.status} data={this.props.data}
        scrollListen={this.scrollListener}
      />
    );
  }

}


function mapDispatchToProps(dispatch) {
  return {
    getNextPage: (data, page) => {
      dispatch(getNextPage(data, page));
    },
    setStatus: (target) => {
      dispatch(setStatus(target));
    },
    setScroll: (x, y) => {
      dispatch(setScroll(x, y));
    },
  };
}

const IndexList = connect(state => ({
  status: state.IndexList.status,
  data: state.IndexList[state.IndexList.status.path],
}), mapDispatchToProps)(Index);


export default IndexList;

