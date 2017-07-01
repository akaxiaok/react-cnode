/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import { browserHistory } from 'react-router';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSend from 'material-ui/svg-icons/content/send';
import IconMessage from 'material-ui/svg-icons/communication/message';
import IconPerson from 'material-ui/svg-icons/social/person';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
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
      selectedIndex: this.props.index,
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
    return this.state.selectedIndex !== np.selectedIndex
      || this.state.messageCount !== ns.messageCount;
  }


  select = (index) => {
    const myUrl = this.props.User && this.props.User.loginname ? `/user/${this.props.User.loginname}` : '/signin';
    switch (index) {
      case 0:
        browserHistory.push('/');
        break;
      case 1:
        browserHistory.push('/topic/create');
        break;
      case 2:
        browserHistory.push('/my/messages');
        break;
      case 3:
        browserHistory.push(myUrl);
        break;
      default:
        browserHistory.push('/');
        break;
    }
    this.setState({ selectedIndex: index });
  };

  render() {
    const home = <IconHome />;
    const message =  <IconMessage />;
    const send = <IconSend />;
    const person = <IconPerson />;
    return (
      <footer className="common-footer menu" >
        <BottomNavigation selectedIndex={this.state.selectedIndex} >
          <BottomNavigationItem
            label="首页"
            icon={home}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="发表"
            icon={send}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="消息"
            icon={message}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="我的"
            icon={person}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </footer>
    );
  }
}

const Footer = connect(state => ({ User: state.User }), action('User'))(FooterInit);

export default Footer;
