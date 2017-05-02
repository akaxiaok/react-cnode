import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetNextPage from 'get-next-page';
import promis from 'es6-promise';
import fetch from 'isomorphic-fetch';
import action from '../../Action/Action';
import { merged, config } from '../../Tool';
import { DataLoad } from './index';

const { target } = config;

/**
 * 模块入口方法
 *
 * @param {Object} mySetting
 * @returns
 */
const Main = (mySetting) => {
  debugger;
  const setting = {
    id: '', // 应用唯一id表示
    type: 'GET', // 请求类型
    url: '', // 请求地址
    data: null, // 发送给服务器的数据
    component: <div />, // 数据回调给的组件
    success: state => state, // 请求成功后执行的方法
    error: state => state, // 请求失败后执行的方法
  };

  /**
   * 覆盖默认设置
   */
  for (const key in mySetting) {
    setting[key] = mySetting[key];
  }

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
      this.initState = (props) => {
        const { state, location } = props;
        const { pathname, search } = location;
        this.path = pathname + search;

        if (typeof this.action === 'undefined' && location.action === 'PUSH') {
          this.action = false;
        } else {
          this.action = true;
        }

        if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
          this.state = state.path[this.path];
        } else {
          this.state = merged(state.defaults); // 数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
          this.state.path = this.path;
          this.action = false;
        }
      };

      /**
       * DOM初始化完成后执行回调
       */
      this.redayDOM = () => {
        const { success, error } = this.props.setting;
        // todo: scrollX,scrollY 在哪些时候有用？
        const { scrollX, scrollY } = this.state;
        if (this.get) return false; // 已经加载过
        debugger;
        window.scrollTo(scrollX, scrollY); // 设置滚动条位置
        // let { page, limit, mdrender, tab } = this.getData();
        // fetch(target + this.getUrl() + '?page=' + page + '&limit=' + limit + '&mdrender=' + mdrender + '&tab=' + tab).then((response) => {
        //   if (response.status >= 400) {
        //     throw new Error('Bad response from server');
        //   }
        //   return response.json();
        // }).then((json) => {
        //   this.get = true;
        //   this.load(json);
        // }).catch(() => {
        //   this.error();
        // });
        this.get = new GetNextPage(this.refs.dataload, {
          url: target + this.getUrl(),
          data: this.getData(),
          start: this.start,
          load: this.load,
          error: this.error,
        });
      };

      /**
       * 请求开始
       */
      this.start = () => {
        this.state.loadAnimation = true;
        this.state.loadMsg = '正在加载中...';
        // 从connect获得的方法
        debugger;
        this.props.setState(this.state);
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
        debugger;
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
        this.props.setState(state);
      };

      /**
       * 请求失败时
       */
      this.error = () => {
        this.state.loadAnimation = false;
        this.state.loadMsg = '加载失败';
        this.props.setState(this.state);
      };

      /**
       * url更改时
       */
      this.unmount = () => {
        this.get.end();
        delete this.get;
        delete this.action;
        this.state.scrollX = window.scrollX; // 记录滚动条位置
        this.state.scrollY = window.scrollY;
        debugger;
        this.props.setState(this.state);
      };

      /**
       * 获取ajax 请求url
       *
       * @returns Object
       */
      this.getUrl = () => {
        const { url } = this.props.setting;
        if (typeof url === 'function') {
          return url(this.props, this.state);
        } else if (url && typeof url === 'string') {
          return url;
        }
        return this.props.location.pathname;
      };

      /**
       * 获取要发送给服务器的数据
       *
       * @returns
       */
      this.getData = () => {
        const { data } = this.props.setting;
        if (typeof data === 'function') {
          return data(this.props, this.state);
        } else if (data && typeof data === 'string') {
          return data;
        }
        return this.props.location.query;
      };

      this.initState(this.props);
    }

    render() {
      const { loadAnimation, loadMsg } = this.state;
      return (
        <div>
          {
            //todo: 这里命名为state，让人困扰，其实是个prop
          }
          <this.props.setting.component {...this.props} state={this.state} />
          <div ref="dataload" ><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} /></div>
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

      this.initState(np);
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
  Index.defaultProps = { setting };
  window.my = action(action.id);
  console.log(action(action.id));
  // mapDispatchToProps: (Object or Function): If an object is passed,
  // each function inside it is assumed to be a Redux action creator.
  // An object with the same function names, but with every action creator
  // wrapped into a dispatch call so they may be invoked directly,
  // will be merged into the component’s props.
  debugger;
  return connect(state => ({ state: state[setting.id], User: state.User }),
    action(action.id))(Index);
};


export default Main;
