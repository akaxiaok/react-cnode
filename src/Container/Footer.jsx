/**
 * Created by Kimi on 2017/7/6.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Component/Footer';
import action from '../Action/Action';
import { Tool } from '../Tool';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  getMessageCount = () => {
    const accesstoken = this.props.user ? this.props.user.accesstoken : '';
    if (accesstoken) {
      Tool.get('/api/v1/message/count', { accesstoken }, (res) => {
        this.props.setState({
          messageCount: res.data,
        });
      });
    }
  };

  componentDidMount() {
    this.getMessageCount();
  }

  render() {
    let selected = 0;
    const myUrl = this.props.user && this.props.user.loginname ? `/user/${this.props.user.loginname}` : '/signin';
    switch (window.location.pathname) {
      case '/':
        selected = 0;
        break;
      case '/topic/create':
        selected = 1;
        break;
      case '/message':
        selected = 2;
        break;
      case '/user':
        selected = 4;// since badge take the position of 3, so this is 4
        break;
      default:
        selected = -1;
        break;
    }
    const count = this.props.user && this.props.user.messageCount ? this.props.user.messageCount : 0;
    return (
      <Footer selectedIndex={selected} messageCount={count}
              url={myUrl} setState={this.props.setState} />
    )
  }
}

const FooterC = connect(state => ({ user: state.User }), action('User'))(Main);

export default FooterC;
