/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import action from '../Action/Action';
import { Tool } from '../Tool';
import Header from './Header';
import TipMsgSignIn from './TipMsgSignIn';
import NewTopic from './NewTopic';
import Footer from './Footer';

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
        return alert('请选择发表类型');
      } else if (state.title.length < 10) {
        return alert('标题字数10字以上');
      } else if (state.content.length < 30) {
        return alert('内容字数30字以上');
      }
      this.postState = true;
      Tool.post('/api/v1/topics', this.state, (res) => {
        if (res.success) {
          browserHistory.push({
            pathname: `/topic/${res.topic_id}`,
          });
        } else {
          alert('发表失败');
          this.postState = false;
        }
      }, () => {
        alert('发表失败');
        this.postState = false;
      });
    };

    /**
     * 监听用户选择发表类型
     *
     * @param {Object} e 事件出发的元素
     */
    this.tabInput = (e) => {
      this.state.tab = e.target.value;
    };

    /**
     * 监听用户输入标题
     *
     * @param {Object} e //事件触发的元素
     */
    this.titleInput = (e) => {
      this.state.title = e.target.value;
    };

    /**
     * 监听用户输入内容
     *
     * @param {Object} e //事件触发的元素
     */
    this.contentInput = (e) => {
      this.state.content = e.target.value;
    };
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
        rightIcon: 'fabu',
        rightClick: this.rightClick,
      };
    }
    return (
      <div>
        <Header title="发表主题" {...headerSet} />
        <div className="vertical-margin">
          {main}
        </div>
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}


export default connect(state => ({ User: state.User }), action('TopicCreate'))(TopicCreate); // 连接redux
