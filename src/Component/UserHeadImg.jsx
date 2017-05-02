/**
 * Created by Kimi on 2017/5/2.
 */
import React from 'react';
/**
 * 用户头像
 */
export default function UserHeadImg(props) {
    return (<div className="user-headimg" style={{ backgroundImage: `url(${props.url})` }} />);
}