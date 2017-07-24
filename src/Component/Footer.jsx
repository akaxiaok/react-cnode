/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSend from 'material-ui/svg-icons/content/send';
import IconMessage from 'material-ui/svg-icons/communication/message';
import IconPerson from 'material-ui/svg-icons/social/person';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import   Badge   from 'material-ui/Badge';

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
export default class Footer extends Component {
  static defaultProps = {
    messageCount: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
    }
  }


  shouldComponentUpdate(np, ns) {
    return this.state.selectedIndex !== ns.selectedIndex
      || this.props.messageCount !== np.props;
  }


  select = (index) => {
    switch (index) {
      case 0:
        browserHistory.push('/');
        break;
      case 1:
        browserHistory.push('/topic/create');
        break;
      case 2:
        browserHistory.push('/messages');
        break;
      case 4: // since badge take the position of 3, so this is 4
        browserHistory.push(this.props.url);
        break;
      default:
        browserHistory.push('/');
        break;
    }
    this.setState({ selectedIndex: index });
  };

  render() {
    const home = <IconHome />;
    const message = <IconMessage />;
    const send = <IconSend />;
    const person = <IconPerson />;
    const count = this.props.messageCount < 99 ? this.props.messageCount : 99;
    const badge = <Badge secondary={true} badgeContent={count} style={{
      flex: 0,
      padding: 0,
      display: this.props.messageCount ? 'inline-block' : 'none'
    }}
                         badgeStyle={{
                           width: '18px',
                           height: '18px',
                           top: '5px',
                           right: '20px',
                           fontSize: '12px'
                         }} />;
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
            className="badge"
          />
          {badge}
          <BottomNavigationItem
            label="我的"
            icon={person}
            onTouchTap={() => this.select(4)} // since badge take the position of 3, so this is 4
          />
        </BottomNavigation>
      </footer>
    );
  }
}

