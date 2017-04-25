/* eslint-disable react/prop-types */
import { GetNextPage } from './common/index';
import Main from './Main';

export default GetNextPage({
  id: 'IndexList',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: '/api/v1/topics',
  // todo: what's this ?
  data: (props, state) => { // 发送给服务器的数据
    const { page, limit, mdrender } = state;
    return {
      tab: props.location.query.tab || 'all',
      page,
      limit,
      mdrender,
    };
  },
  success: state => state, // 请求成功后执行的方法
  error: state => state, // 请求失败后执行的方法
});
