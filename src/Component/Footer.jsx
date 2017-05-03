/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import action from '../Action/Action';

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

  componentDidMount() {
    this.getMessageCount();
  }

  shouldComponentUpdate(np, ns) {
    // 防止组件不必要的更新
    return this.props.index !== np.index || this.state.messageCount !== ns.messageCount;
  }

  componentDidUpdate() {
    this.getMessageCount();
  }

  render() {
    const myUrl = this.props.User && this.props.User.loginname ? `/user/${this.props.User.loginname}` : '/signin';
    const arr = [];
    arr[this.props.index] = 'on';
    return (
      <footer className="common-footer" >
        <div className="zhanwei" />
        <ul className="menu" data-flex="box:mean" >
          <li className={arr[0]} >
            <Link to="/" >
              <i className="iconfont icon-shouye" />首页
            </Link>
          </li>
          <li className={arr[1]} >
            <Link to="/topic/create" >
              <i className="iconfont icon-fabu" />发表
            </Link>
          </li>
          <li className={arr[2]} >
            <Link to="/my/messages" >
              <i className="iconfont icon-xiaoxi" />消息{this.state.messageCount > 0 ?
                <em>{this.state.messageCount}</em> : ''}
            </Link>
          </li>
          <li className={arr[3]} >
            <Link to={myUrl} >
              <i className="iconfont icon-wode" />我的
            </Link>
          </li>
        </ul>
      </footer>
    );
  }
}
FooterInit.defaultProps = {
  index: 0,
};
const Footer = connect(state => ({ User: state.User }), action('User'))(FooterInit);

export default Footer;
