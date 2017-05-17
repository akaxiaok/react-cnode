/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNextPage, setState, setPath, setPosition } from '../Action/Action';
import DataLoad from './DataLoad';
import Main from './Main';

/**
 * 组件入口
 *
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  constructor(props) {
    super(props);

    /**
     * 初始化状态
     *
     * @param {Object} props
     */
    this.initState = () => {
      const { pathname, search } = this.props.location;
      this.path = pathname + search;
      this.props.setPath(pathname + search);
    };
    /**
     * DOM初始化完成后执行回调
     */
    this.redayDOM = () => {
      // todo: scrollX,scrollY 在哪些时候有用？
      // const { scrollX, scrollY } = this.state;
      const { scrollX, scrollY } = this.props.state.defaults;
      if (this.get) return false; // 已经加载过
      this.initState();
      debugger;
      window.scrollTo(scrollX, scrollY); // 设置滚动条位置
      // const data = this.getData();
      const data = this.props.state.defaults;
      try {
        // this.start();
        this.get = true;
        this.props.getNextPage(data);
      } catch (e) {
        throw new Error(e);
      }
      this.scrollListener(this.dataLoad, data);

    };
    /**
     * 下一页加载成功
     *
     * @param {Object} res
     */
    this.load = (res) => {

      // 解构赋值 相当于
      // const state = this.state;
      // const data = res.data;
      const { state } = this;
      const { data } = res;
      // todo: before 是哪来的？ 改成state.limit
      //  if (!data.length && data.length < before.limit) {
      if (!data.length && data.length < state.limit) {
        state.nextBtn = false;
        state.loadMsg = '没有了';
      } else {
        state.nextBtn = true;
        state.loadMsg = '上拉加载更多';
      }
      Array.prototype.push.apply(state.data, data);
      state.loadAnimation = false;
      state.page = ++state.page;
    };


    /**
     * url更改时
     */
    this.unmount = () => {
      delete this.get;
      // this.state.scrollX = window.scrollX; // 记录滚动条位置
      // this.state.scrollY = window.scrollY;
      debugger;
      this.props.setPosition(window.scrollX, window.scrollY);
    };

    this.getEl = (select) => {
      switch (typeof select) {
        case 'string':
          return document.querySelectorAll(select);
        case 'object':
          if (Object.prototype.toString.call(select) === '[object Array]') {
            return select;
          } else {
            return [select];
          }
      }
    }
    this.scrollListener = (select, set) => {
      /*
       元素在可视区位置，符合其中一个条件就会触发加载机制
       */
      this.top = set.top || 0; // 元素在顶部伸出的距离才加载
      this.right = set.right || 0; // 元素在右边伸出的距离才加载
      this.bottom = set.bottom || 0; // 元素在底部伸出的距离才加载
      this.left = set.left || 0; // 元素在左边伸出的距离才加载
      this.el = this.getEl(select);

      this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];
      this.bind();
    }
    this.eachDOM = () => {
      if (this.props.state.defaults.loadAnimation) return;
      const length = this.el.length;
      for (let i = 0; i < length; i += 1) {
        if (this.testMeet(this.el[i]) === true) {
          this.props.getNextPage(this.props.state.defaults);

          return;
        }
      }
    }
    this.bind = () => {
      // 事件绑定
      const eventList = this.monitorEvent;
      for (let i = 0; i < eventList.length; i += 1) {
        window.addEventListener(eventList[i], this.eachDOM, false);
      }
    }
    this.testMeet = (el) => {
      let bcr = el.getBoundingClientRect(); // 取得元素在可视区的位置
      let mw = el.offsetWidth; // 元素自身宽度
      let mh = el.offsetHeight; // 元素自身的高度
      let w = window.innerWidth; // 视窗的宽度
      let h = window.innerHeight; // 视窗的高度
      let boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); //上下符合条件
      let boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); //上下符合条件
      if (el.width != 0 && el.height != 0 && boolX && boolY) {
        return true;
      } else {
        return false;
      }
    }
    this.initState(this.props);
  }

  render() {
    const { loadAnimation, loadMsg } = this.props.state.defaults;
    const path = this.path;
    return (
      <div>
        <Main {...this.props.state} data={this.props.state.path[path]} />
        <div ref={dataLoad => (this.dataLoad = dataLoad)} ><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
        </div>
      </div>
    );
  }

  /**
   * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
   * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
   * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
   */
  componentDidMount() {
    this.redayDOM();
  }

  /**
   * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
   */
  componentWillReceiveProps(np) {
    const { location } = np;
    const { pathname, search } = location;
    const path = pathname + search;
    if (this.path !== path) {
      this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
    }
  }

  /**
   * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
   * 使用该方法可以在组件更新之后操作 DOM 元素。
   */
  componentDidUpdate() {
    this.redayDOM();
  }

  /**
   * 在组件从 DOM 中移除的时候立刻被调用。
   * 在该方法中执行任何必要的清理，比如无效的定时器，
   * 或者清除在 componentDidMount 中创建的 DOM 元素
   */
  componentWillUnmount() {
    this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
  }

}

// mapDispatchToProps: (Object or Function): If an object is passed,
// each function inside it is assumed to be a Redux action creator.
// An object with the same function names, but with every action creator
// wrapped into a dispatch call so they may be invoked directly,
// will be merged into the component’s props.
function mapDispatchToProps(dispatch) {
  return {
    getNextPage: (data) => {
      dispatch(getNextPage(data));
    },
    setState: (data) => {
      dispatch(setState(data));
    },
    setPath: (path) => {
      dispatch(setPath(path));
    },
    setPosition: (x, y) => {
      dispatch(setPosition(x, y));
    },
  };
}
const IndexList = connect(state => ({ state: state.IndexList, User: state.User }),
  mapDispatchToProps)(Index);


export default IndexList;

