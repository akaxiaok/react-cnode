import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../Action/Action';
import { Tool, merged } from '../Tool';


/**
 * 模块入口方法
 *
 * @param {Object} mySeting
 * @returns
 */
const Main = (mySeting) => {
  const seting = {
    id: '', // 应用唯一id表示
    type: 'GET', // 请求类型
    url: '', // 请求地址
    stop: false, // true 拦截请求，false不拦截请求
    data: null, // 发送给服务器的数据
    component: <div />, // 数据回调给的组件
    success: state => state, // 请求成功后执行的方法
    error: state => state, // 请求失败后执行的方法
  };

  /**
   * 覆盖默认设置
   */
  for (const key in mySeting) {
    seting[key] = mySeting[key];
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

        if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path) {
          this.state = state.path[this.path];
        } else {
          debugger;
          this.state = merged(state.defaults); // 数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
          this.state.path = this.path;
        }
      };

      /**
       * DOM初始化完成后执行回调
       */
      this.redayDOM = () => {
        const { success, error } = this.props.seting;
        const { scrollX, scrollY } = this.state;
        if (this.get) return false; // 已经加载过
        window.scrollTo(scrollX, scrollY); // 设置滚动条位置
        if (this.testStop()) return false; // 请求被拦截

        this.get = Tool.get(this.getUrl(), this.getData(), (res) => {
          this.state.loadMsg = '加载成功';
          this.state.loadAnimation = false;
          this.state.data = res.data;
          debugger;
          this.props.setState(success(this.state) || this.state);
        }, (res, xhr) => {
          if (xhr.status === 404) {
            this.state.loadMsg = '话题不存在';
          } else {
            this.state.loadMsg = '加载失败';
          }
          this.state.loadAnimation = false;
          debugger;
          this.props.setState(error(this.state) || this.state);
        });
      };

      /**
       * 组件卸载前执行一些操作
       */
      this.unmount = () => {
        if (typeof this.get !== 'undefined') {
          this.get.end();
          delete this.get;
        }
        this.state.scrollX = window.scrollX; // 记录滚动条位置
        this.state.scrollY = window.scrollY;
        this.props.setState(this.state);
      };

      /**
       * 获取ajax 请求url
       *
       * @returns Object
       */
      this.getUrl = () => {
        const { url } = this.props.seting;
        if (typeof url === 'function') {
          return url(this.props, this.state);
        } else if (url && typeof url === 'string') {
          return url;
        }
        return this.props.location.pathname;
      };

      /**
       * 获取要发送的数据
       *
       * @returns
       */
      this.getData = () => {
        const { data } = this.props.seting;
        if (typeof data === 'function') {
          return data(this.props, this.state);
        } else if (data && typeof data === 'string') {
          return data;
        }
        return this.props.location.query;
      };

      /**
       * 是否要拦截请求
       *
       * @returns
       */
      this.testStop = () => {
        const { stop } = this.props.seting;
        if (typeof stop === 'function') {
          return stop(this.props, this.state);
        }
        return stop;
      };
      this.initState(this.props);
    }

    render() {
      debugger;
      return <this.props.seting.component {...this.props} state={this.state} />;
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
  Index.defaultProps = { seting };

  return connect(state => ({ state: state[seting.id], User: state.User }), action(mySeting.id))(Index); // 连接redux
};


export default Main;
