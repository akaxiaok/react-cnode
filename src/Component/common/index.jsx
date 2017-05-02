/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import action from '../../Action/Action';
import { Tool } from '../../Tool';
import GetData from './GetData';
import GetNextPage from './GetNextPage';

export { GetData, GetNextPage };
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
  render() {
    const { loadAnimation, loadMsg } = this.props;
    return (
      <div className={`data-load data-load-${loadAnimation}`}>
        <div className="msg">{loadMsg}</div>
      </div>
    );
  }
}
DataLoad.defaultProps = {
  loadAnimation: true, // 默认显示加载动画
  loadMsg: '正在加载中',
};

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
  render() {
    const { title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = this.props;
    let left = null;

    if (leftTo && leftIcon) {
      left = (
        <Link to={leftTo}>
          <i className={`iconfont icon-${leftIcon}`} />
        </Link>
            );
    } else if (leftIcon === 'fanhui') { // 返回上一页
      left = (
        <a onClick={browserHistory.goBack}>
          <i className={`iconfont icon-${leftIcon}`} />
        </a>
            );
    }

    let right = null;
    if (rightTo && rightIcon) {
      right = (
        <Link to={rightTo}>
          <i className={`iconfont icon-${rightIcon}`} />
        </Link>
            );
    } else if (rightClick && rightIcon) {
      right = (
        <div onClick={rightClick}>
          <i className={`iconfont icon-${rightIcon}`} />
        </div>
            );
    }
    return (
      <header className="common-header" data-flex>
        <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
          {left}
        </div>
        <h2 className="title" data-flex-box="1">{title}</h2>
        <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
          {right}
        </div>
      </header>
    );
  }
}


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

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
class FooterInit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageCount: 0,
    };

    this.getMessageCount = () => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      if (accesstoken) {
        Tool.get('/api/v1/message/count', { accesstoken }, (res) => {
          this.setState({
            messageCount: res.data,
          });
        });
      }
    };
  }

  render() {
    const myUrl = this.props.User && this.props.User.loginname ? `/user/${this.props.User.loginname}` : '/signin';
    const arr = [];
    arr[this.props.index] = 'on';
    return (
      <footer className="common-footer">
        <div className="zhanwei" />
        <ul className="menu" data-flex="box:mean">
          <li className={arr[0]}>
            <Link to="/">
              <i className="iconfont icon-shouye" />首页
                        </Link>
          </li>
          <li className={arr[1]}>
            <Link to="/topic/create">
              <i className="iconfont icon-fabu" />发表
                        </Link>
          </li>
          <li className={arr[2]}>
            <Link to="/my/messages">
              <i className="iconfont icon-xiaoxi" />消息{this.state.messageCount > 0 ?
                <em>{this.state.messageCount}</em> : ''}
            </Link>
          </li>
          <li className={arr[3]}>
            <Link to={myUrl}>
              <i className="iconfont icon-wode" />我的
                        </Link>
          </li>
        </ul>
      </footer>
    );
  }

  componentDidMount() {
    this.getMessageCount();
  }

  shouldComponentUpdate(np, ns) {
    return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; // 防止组件不必要的更新
  }

  componentDidUpdate() {
    this.getMessageCount();
  }
}
FooterInit.defaultProps = {
  index: 0,
};


const Footer = connect(state => ({ User: state.User }), action('User'))(FooterInit);

export { Footer };




