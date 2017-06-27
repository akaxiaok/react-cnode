/* eslint-disable react/prop-types */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import { browserHistory } from 'react-router';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
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
    const nearbyIcon = <IconLocationOn />;
    const arr = [];
    arr[this.props.index] = 'on';
    return (
      <footer className="common-footer" >
        <div className="zhanwei" />
        <div className="menu" >
          <BottomNavigation selectedIndex={parseInt(this.props.index)} >
            <BottomNavigationItem
              label="首页"
              icon={nearbyIcon}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="发表"
              icon={nearbyIcon}
              onTouchTap={() => this.select(1)}
            />

            <BottomNavigationItem
              label="消息"
              icon={nearbyIcon}
              onTouchTap={() => this.select(2)}
            />
            <BottomNavigationItem
              label="我的"
              icon={nearbyIcon}
              onTouchTap={() => this.select(3)}
            />
          </BottomNavigation>
        </div>


      </footer>
    );
  }
}
FooterInit.defaultProps = {
  index: 0,
};
const Footer = connect(state => ({ User: state.User }), action('User'))(FooterInit);

export default Footer;
