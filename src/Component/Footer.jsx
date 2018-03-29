/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSend from 'material-ui/svg-icons/content/send';
import IconMessage from 'material-ui/svg-icons/communication/message';
import IconPerson from 'material-ui/svg-icons/social/person';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import history from '../Config/history';

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
export default class Footer extends Component {

  select = (index) => {
    switch (index) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/topic/create');
        break;
      case 2:
        history.push('/messages');
        break;
      case 3:
        history.push(this.props.url);
        break;
      default:
        history.push('/');
        break;
    }
    this.setState({ selectedIndex: index });
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
    };
  }

  shouldComponentUpdate(np, ns) {
    return this.state.selectedIndex !== ns.selectedIndex
      || this.props.messageCount !== np.props;
  }

  render() {
    const home = <IconHome />;
    const message = <IconMessage />;
    const send = <IconSend />;
    const person = <IconPerson />;
    return (
      <footer className="common-footer menu" >
        <BottomNavigation
          className="common-footer"
          selectedIndex={this.state.selectedIndex}
          style={{ height: '50px' }}
        >
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
        </BottomNavigation >
      </footer >
    );
  }
}

