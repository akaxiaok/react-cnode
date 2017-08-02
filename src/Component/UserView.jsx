import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DataLoad from './DataLoad';
import Header from './Header';
import Home from './Home';
import action from '../Action/Action';


class Main extends Component {
  constructor(props) {
    super(props);
    this.redayDOM = () => {
      this.props.getUserView({
        url: this.url(this.props),
      });
      return true;
    };
  }

  componentDidMount() {
    this.redayDOM();
  }

  componentWillReceiveProps(np) {
    if (np.params.loginname !== this.props.params.loginname) {
      this.props.getUserView({
        url: this.url(np),
      });
    }
  }

  url = props => `/api/v1/user/${props.params.loginname}`;

  render() {
    const { loadAnimation, loadMsg, tabIndex } = this.props.status;
    const { data, params } = this.props;
    const { loginUser } = this.props;
    const main = data ? <Home data={data} tabIndex={tabIndex} /> :
    <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
    const title = params.loginname === loginUser ? '个人中心' : `${params.loginname}的个人中心`;

    const leftIcon = params.loginname === loginUser ? null : 'back';
    const rightIcon = params.loginname === loginUser ? 'logout' : null;
    return (
      <div >
        <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
        <div className="vertical-margin" >
          {main}
        </div >
      </div >
    );
  }
}

Main.propTypes = {
  loginUser: PropTypes.string.isRequired,
};
export default connect(state =>
    ({ status: state.UserView.status, data: state.UserView.data, loginUser: state.User.loginname }),
  action('UserView'))(Main); // 连接redux
