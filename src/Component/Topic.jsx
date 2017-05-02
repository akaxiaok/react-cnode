/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Tool } from '../Tool';
import { DataLoad, Header, GetData } from './common/index';
import UserHeadImg from './UserHeadImg';
import TabIcon from './TabIcon';
import TipMsgSignIn from './TipMsgSignIn';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    super(props);

    /**
     * 点赞或取消赞
     *
     * @param {String} id
     * @param {Number} index
     * @param {String} loginname
     */
    this.clickZan = (id, index, loginname) => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      const uid = this.props.User ? this.props.User.id : '';
      if (!accesstoken) {
        return browserHistory.push({ pathname: '/signin' }); // 跳转到登录
      } else if (this.props.User.loginname === loginname) {
        return alert('你不能给自己点赞');
      }

      Tool.post(`/api/v1/reply/${id}/ups`, { accesstoken }, (res) => {
        const ups = this.props.state.data.replies[index - 1].ups;
        if (res.action === 'down') { // 取消点赞
          for (let i = 0; i < ups.length; i++) {
            if (ups[i] === uid) {
              ups.splice(i, 1);
            }
          }
        } else {
          ups.push(uid);
        }
        this.props.setState(this.props.state);
      });
    };

    /**
     * 显示回复框
     *
     * @param {String} index
     */
    this.showReplyBox = (index) => {
      const accesstoken = this.props.User ? this.props.User.accesstoken : '';
      if (!accesstoken) {
        return browserHistory.push({ pathname: '/signin' }); // 跳转到登录
      }
      --index;
      if (this.props.state.data.replies[index].display === 'block') {
        this.props.state.data.replies[index].display = 'none';
      } else {
        this.props.state.data.replies[index].display = 'block';
      }

      this.props.setState(this.props.state);
    };
    /**
     * 回复成功后，重新加载数据
     *
     * @param {Object} data
     */
    this.reLoadData = (data) => {
      this.props.state.data = data;
      this.props.setState(this.props.state);
    };
  }

  render() {
    const { data, loadAnimation, loadMsg } = this.props.state;
    const main = data ? (<Article
      {...this.props} reLoadData={this.reLoadData} clickZan={this.clickZan}
      showReplyBox={this.showReplyBox}
    />) :
      <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

    return (
      <div>
        <Header title="详情" leftIcon="fanhui" />
        {main}
      </div>
    );
  }
}

/**
 * 文章主体部分
 *
 * @class Article
 * @extends {Component}
 */
class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, create_at, visit_count, reply_count, content, replies, author } = this.props.state.data;
    const createMarkup = () => ({
      __html: content,
    });
    const bottom = this.props.User ?
      <ReplyBox reLoadData={this.props.reLoadData} data={{ accesstoken: this.props.User.accesstoken, id }} /> :
      <TipMsgSignIn />;

    return (
      <div className="topic" >
        <div className="user" data-flex >
          <div className="headimg" data-flex-box="0" >
            <UserHeadImg url={author.avatar_url} />
          </div>
          <div className="data" data-flex="dir:top" data-flex-box="1" >
            <div data-flex="main:justify" >
              <Link to={`/user/${author.loginname}`} className="name" >{author.loginname}</Link>
              <time data-flex-box="1" >{Tool.formatDate(create_at)}</time>
              <div className="lou" >#楼主</div>
              <div className="font" data-flex="main:center cross:center" >
                <TabIcon {...this.props.state.data} /></div>
            </div>
            <div className="qt" data-flex >
              <div>阅读：{visit_count}</div>
              <div>回复：{reply_count}</div>
            </div>
          </div>
        </div>
        <h2 className="tit2" >{title}</h2>
        <div className="content markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        <h3 className="tit3" >共<em>{replies.length}</em>条回复</h3>
        <ReList
          reLoadData={this.props.reLoadData} id={id} list={replies} clickZan={this.props.clickZan}
          showReplyBox={this.props.showReplyBox} User={this.props.User}
        />
        {bottom}
      </div>
    );
  }
}
/**
 * 回复列表
 *
 * @class ReList
 * @extends {Component}
 */
class ReList extends Component {
  constructor(props) {
    super(props);

    /**
     * 验证回复项目是否点赞
     *
     * @param {Array} arr
     * @returns
     */
    this.isUp = (arr) => {
      const id = this.props.User ? this.props.User.id : '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === id) return true;
      }
      return false;
    };
  }

  render() {
    const accesstoken = this.props.User ? this.props.User.accesstoken : '';
    return (
      <ul className="re-list" >
        {
          this.props.list.map((item, index) => {
            const { id, content, author, ups, create_at, display = 'none' } = item;
            const at = new Date(create_at);
            const upState = this.isUp(ups);
            const createMarkup = () => ({
              __html: content,
            });


            return (
              <li key={index} data-flex >
                <div className="headimg" data-flex-box="0" >
                  <UserHeadImg url={author.avatar_url} />
                </div>
                <div className="main" data-flex-box="1" >
                  <div data-flex="main:justify" >
                    <Link
                      to={`/user/${author.loginname}`}
                      className="name"
                    >{author.loginname}</Link>
                    <time data-flex-box="1" >{Tool.formatDate(create_at)}</time>
                    <div className="lou" >#{++index}</div>
                  </div>
                  <div
                    className="content markdown-body"
                    dangerouslySetInnerHTML={createMarkup()}
                  />
                  <div className="bottom" data-flex="main:right" >
                    <div
                      className={`font font-${upState}`} onClick={() => {
                      this.props.clickZan(id, index, author.loginname);
                    }}
                    >
                      <i className="iconfont icon-dianzan " />
                      <em>{ups.length ? ups.length : ''}</em>
                    </div>
                    <div
                      className="font" onClick={() => {
                      this.props.showReplyBox(index);
                    }}
                    >
                      <i className="iconfont icon-huifu" />
                    </div>
                  </div>
                  <ReplyBox
                    placeholder={`@${author.loginname}`} reLoadData={this.props.reLoadData}
                    display={display} loginname={author.loginname}
                    data={{ accesstoken, id: this.props.id, reply_id: id }}
                  />
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

/**
 * 回复框
 *
 * @class ReplyBox
 * @extends {Component}
 */
class ReplyBox extends Component {
  constructor(props) {
    super(props);
    this.state = { btnname: '回复' };

    /**
     * 提交回复
     *
     * @returns
     */
    this.submit = () => {
      this.state = { btnname: '提交中...' };
      const data = this.props.data;
      if (data.reply_id) {
        data.content = `[@${this.props.loginname}](/user/${this.props.loginname}) ${this.refs.content.value}`;
      } else {
        data.content = this.refs.content.value;
      }
      if (data.content == '') {
        return alert('回复内容不能为空！');
      }
      data.content += '\n\r<br><br>来自<a href="https://lzxb.github.io/react-cnode/" target="_blank">react-cnode手机版</a>';
      Tool.post(`/api/v1//topic/${data.id}/replies`, data, (res) => {
        this.setState({ btnname: '回复成功，刷新页面中..' });
        this.refs.content.value = '';
        Tool.get(`/api/v1//topic/${data.id}`, {}, (res) => {
          this.props.reLoadData(res.data); // 刷新页面
          this.setState({ btnname: '回复' });
        }, () => {
          this.state = { btnname: '刷新失败，请手动刷新试试' };
        });
      }, (res) => {
        this.setState({ btnname: '回复失败' });
      });
    };
  }

  render() {
    return (
      <div className="reply-box" style={{ display: this.props.display }} >
        <div className="text" ><textarea ref="content" placeholder={this.props.placeholder} /></div>
        <div data-flex="main:right" >
          <button className="btn" onClick={this.submit} >{this.state.btnname}</button>
        </div>
      </div>
    );
  }
}

ReplyBox.defaultProps = {
  display: 'block',
  placeholder: '回复支持Markdown语法,请注意标记代码',
};

export default GetData({
  id: 'Topic',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: (props) => `/api/v1/topic/${props.params.id || ''}`,
  data: (props, state) => { // 发送给服务器的数据
    const accesstoken = props.User ? props.User.accesstoken : '';
    return { mdrender: state.mdrender, accesstoken };
  },
  success: state => state, // 请求成功后执行的方法
  error: state => state, // 请求失败后执行的方法
});
