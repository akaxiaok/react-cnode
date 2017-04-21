import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from '../Action/Index';
import {Header} from './common/index';
import {browserHistory} from 'react-router'

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.signout = () => {
            this.props.signin();
            browserHistory.replace({pathname: '/'});
        }

    }

    render() {
        return (
            <div>
                <Header title="退出" leftIcon="fanhui"/>
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <button className="btn btn-red" onClick={this.signout}>确认退出登录？</button>
                    </div>
                </div>
            </div>
        );
    }
}



export default connect((state) => {
    return {User: state.User};
}, action('User'))(Main); //连接redux