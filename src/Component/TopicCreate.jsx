/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import action from '../Action/Action';
import { Tool } from '../Tool';
import Header from './Header';
import TipMsgSignIn from './TipMsgSignIn';
import NewTopic from './NewTopic';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class TopicCreate extends Component {
  constructor(props) {
    super(props);

    /**
     * 初始化组件状态
     */
    this.state = {
      open: false,
      message: '',
      title: '',
      tab: '',
      content: '',
      accesstoken: this.props.User ? this.props.User.accesstoken : '',
    };

    this.postState = false;
    /**
     * 发表主题
     *
     * @returns
     */
    this.rightClick = () => {
      const { state } = this;
      if (this.postState) return false;

      if (!state.tab) {
        return this.setState({
          open: true,
          message: '请选择发表类型',
        });
      } else if (state.title.length < 10) {
        return this.setState({
          open: true,
          message: '标题字数10字以上',
        });
      } else if (state.content.length < 30) {
        return this.setState({
          open: true,
          message: '内容字数30字以上',
        });
      }
      this.postState = true;
      Tool.post('/api/v1/topics', this.state, (res) => {
        if (res.success) {
          browserHistory.push({
            pathname: `/topic/${res.topic_id}`,
          });
        } else {
          this.setState({
            open: true,
            message: '发表失败',
          });
          this.postState = false;
        }
      }, () => {
        this.setState({
          open: true,
          message: '发表失败',
        });
        this.postState = false;
      });
    };

    /**
     * 监听用户选择发表类型
     *
     * @param tab
     */
    this.tabInput = (tab) => {
      this.state.tab = tab;
    };

    /**
     * 监听用户输入标题
     *
     * @param {Object} e //事件触发的元素
     * @param value
     */
    this.titleInput = (e, value) => {
      this.state.title = value;
    };

    /**
     * 监听用户输入内容
     *
     * @param {Object} e //事件触发的元素
     * @param value
     */
    this.contentInput = (e, value) => {
      this.state.content = value;
    };
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { User } = this.props;
    let headerSet = {};
    let main = null;
    if (!User) {
      main = <TipMsgSignIn />;
    } else {
      main = (<NewTopic
        {...this.state} tabInput={this.tabInput} titleInput={this.titleInput}
        contentInput={this.contentInput}
      />);
      headerSet = {
        rightIcon: 'post',
        rightClick: this.rightClick,
      };
    }
    return (
      <div>
        <Header title="发表主题" {...headerSet} />
        <div className="vertical-margin scroll-content topic-content" >
          {main}
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="OK"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          onActionTouchTap={this.handleRequestClose}
        />
      </div>
    );
  }
}
export default connect(state => ({ User: state.User }), action('TopicCreate'))(TopicCreate); // 连接redux
