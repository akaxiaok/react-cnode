/* eslint-disable camelcase */
/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';


const REPLY_TRAIL = '';
export default class ReplyBox extends Component {


  constructor(props) {
    super(props);
    this.state = {
      btnname: '回复',
      replyContent: '',
    };
  }

  /**
   * 提交回复
   *
   * @returns
   */
  submit = () => {
    // this.state = { btnname: '提交中...' };

    if (!this.state.replyContent) {
      return false;
    }
    const data = {};
    const { reply_id, accesstoken, id } = this.props;
    data.accesstoken = accesstoken;
    data.id = id;
    if (reply_id) {
      data.reply_id = reply_id;
      data.content = `[@${this.props.loginname}](/user/${this.props.loginname}) ${this.state.replyContent}`;
    } else {
      data.content = this.state.replyContent;
    }
    data.content += REPLY_TRAIL;
    this.props.replyTopic(data);
    this.setState({ replyContent: '' });
    return true;
  };
  handleChange = (event, newValue) => {
    this.setState({ replyContent: newValue });
  }

  render() {
    return (
      <div className="reply-box" style={{ display: this.props.display }} >
        <TextField
          fullWidth
          value={this.state.replyContent}
          multiLine={this.props.multi}
          rows={this.props.rows}
          rowsMax={this.props.rowsMax}
          hintText={this.props.placeholder}
          onChange={this.handleChange}
        />
        <button className="btn" onClick={this.submit} >{this.state.btnname}</button >
      </div >
    );
  }
}

ReplyBox.propTypes = {
  display: PropTypes.string,
  placeholder: PropTypes.string,
  multi: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  reply_id: PropTypes.string,
  accesstoken: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  replyTopic: PropTypes.func.isRequired,
}
;
ReplyBox.defaultProps = {
  display: 'block',
  placeholder: '回复支持Markdown语法,请注意标记代码',
  multi: false,
  rows: 1,
  rowsMax: 20,
  reply_id: '',
};
