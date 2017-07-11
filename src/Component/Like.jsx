/**
 * Created by Kimi on 2017/7/11.
 */
import React, { Component } from 'react';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.likes,
      liked: props.liked,
    };
  }

  handleLike = () => {
    const { likes, liked } = this.state;
    let likeSuccess = false;
    if(this.props.onLike){
      likeSuccess = this.props.onLike();
    }
    if (!likeSuccess){
      return;
    }
    if (liked) {
      this.setState({
          liked: !liked,
          likes: likes - 1,
        }
      )
    } else {
      this.setState({
          liked: !liked,
          likes: likes + 1,
        }
      )
    }
  }

  render() {
    const { likes, liked } = this.state;
    return (
      <div
        className={`font font-${liked}`} onClick={this.handleLike}
      >
        <i className="iconfont icon-dianzan " />
        <em>{0 === likes ? '' : likes}</em>
      </div>
    );
  }
}
Like.defaultProps = {
  liked: false,
  likes: 0,
};
