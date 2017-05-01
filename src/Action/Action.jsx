export default (_ID) => {
  const action = {};
  const arr = [
    'signinSuccess', // 登录成功
    'signin', // 退出登录
    'setState', // 设置状态
  ];

  for (let i = 0; i < arr.length; i++) {
    action[arr[i]] = target => ({ _ID, target, type: arr[i] });
  }

  return action;
};
