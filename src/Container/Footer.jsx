/**
 * Created by Kimi on 2017/7/6.
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Footer from '../Component/Footer';
import action from '../Action/Action';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selected = 0;
    switch (window.location.pathname) {
      case '/':
        selected = 0;
        break;
      case 'topic':
        selected = 1;
        break;
      case 'message':
        selected = 2;
        break;
      case 'user':
        selected = 3;
        break;
      default:
        selected = 4;
        break;
    }

    return (
      <Footer selectedIndex={selected} User={this.props.user} setState={this.props.setState} />
    )
  }
}

const FooterC = connect(state => ({ user: state.User }), action('User'))(Main);

export default FooterC;
