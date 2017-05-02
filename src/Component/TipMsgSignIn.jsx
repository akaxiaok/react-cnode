/**
 * Created by Kimi on 2017/5/2.
 */
import React from 'react';
import { Link } from 'react-router';

/**
 * 提示登录
 *
 * @export
 */
export default function TipMsgSignIn() {
  return (
    <div className="tip-msg-signin" >
      你还未登录，请先<Link to="/signin" >登录</Link>
    </div>
  );
}
