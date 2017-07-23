/**
 * Created by Kimi on 2017/5/3.
 */
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
  }

  handleSelect = (event, key, payload) => {
    this.setState({
      selected: payload,
    })
    this.props.tabInput(payload);
  }

  render() {
    return (
      <div className="topic-create" >
        <div className="item" >
          <SelectField hintText="请选择发布类型" floatingLabelText="请选择发布类型" fullWidth={true} value={this.state.selected}
                       onChange={this.handleSelect} >
            <MenuItem value={'share'} primaryText={'分享'} />
            <MenuItem value={'ask'} primaryText={'问答'} />
            <MenuItem value={'job'} primaryText={'招聘'} />
            <MenuItem value={'dev'} primaryText={'测试'} />
          </SelectField>

        </div>
        <div className="item" >
          <TextField id="topicTitle" floatingLabelText='标题字数 10 字以上' fullWidth={true}
                     onChange={this.props.titleInput}
          />
        </div>
        <div className="item" >
          <TextField id="topicContent" floatingLabelText='内容字数 30 字以上' multiLine={true} fullWidth={true}
                     rows={10}
                     onChange={this.props.contentInput}
          />
        </div>
      </div>
    );
  }
}