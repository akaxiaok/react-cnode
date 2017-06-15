/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNextPage, setStatus, setScroll } from '../Action/Action';
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
      const path = pathname + search;
      if (this.props.status.path !== path) {
        const serchTarget = search.split('=')[1];
        const tab = serchTarget === undefined ? 'all' : serchTarget;
        debugger
        this.props.setStatus({ path, tab });
        return false;
      }
      return true;
    };
    /**
     * DOM初始化完成后执行回调
     */
    this.redayDOM = () => {

      if (this.props.data) {
        return false;
      } // 已经加载过
      if (this.get) return false; // 已经加载过
      if (!this.initState()) return false;
      // if (this.props.data) {
      //   const { scrollX, scrollY } = this.props.data.status;
      //   window.scrollTo(scrollX, scrollY); // 设置滚动条位置
      //   return false;
      // }

      const data = this.props.status;


      try {
        this.get = true;
        this.props.getNextPage(data, 1);
      } catch (e) {
        throw new Error(e);
      }
      this.scrollListener(this.dataLoad, data);
      return true;
    };


    /**
     * url更改时
     */
    this.unmount = () => {
      delete this.get;
      this.props.setScroll(window.scrollX, window.scrollY);
    };

    this.getEl = (select) => {
      switch (typeof select) {
        case 'string':
          return document.querySelectorAll(select);
        case 'object':
          if (Object.prototype.toString.call(select) === '[object Array]') {
            return select;
          }
          return [select];

      }
    };
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
    };
    this.eachDOM = () => {
      if (this.props.status.loadAnimation) return;
      const length = this.el.length;
      for (let i = 0; i < length; i += 1) {
        if (this.testMeet(this.el[i]) === true) {
          this.props.getNextPage(this.props.status, this.props.data.status.page);
          return;
        }
      }
    };
    this.bind = () => {
      // 事件绑定
      const eventList = this.monitorEvent;
      for (let i = 0; i < eventList.length; i += 1) {
        window.addEventListener(eventList[i], this.eachDOM, false);
      }
    };
    this.testMeet = (el) => {
      const bcr = el.getBoundingClientRect(); // 取得元素在可视区的位置
      const mw = el.offsetWidth; // 元素自身宽度
      const mh = el.offsetHeight; // 元素自身的高度
      const w = window.innerWidth; // 视窗的宽度
      const h = window.innerHeight; // 视窗的高度
      const boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); // 上下符合条件
      const boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); // 上下符合条件
      if (el.width != 0 && el.height != 0 && boolX && boolY) {
        return true;
      }
      return false;
    };
  }

  render() {
    const { loadAnimation, loadMsg } = this.props.status;
    return (
      <div>
        <Main tab={this.props.status.tab} data={this.props.data} />
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
    if (this.props.location === location) {
      return
    }
    const { pathname, search } = location;
    const path = pathname + search;
    if (this.props.status.path !== path) {
      const serchTarget = search.split('=')[1];
      const tab = serchTarget === undefined ? 'all' : serchTarget
      debugger
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

  componentWillUpdate(nextProps) {
    const { pathname, search } = nextProps.location;
    const path = pathname + search;
    if (nextProps.data && (this.props.status.path !== path)) {
      const { scrollX, scrollY } = nextProps.data.status;
      window.scrollTo(scrollX, scrollY); // 设置滚动条位置
    }
  }



  /**
   * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
   * 使用该方法可以在组件更新之后操作 DOM 元素。
   */
  componentDidUpdate(prevProps, prevState) {

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
  User: state.User,
}), mapDispatchToProps)(Index);


export default IndexList;

