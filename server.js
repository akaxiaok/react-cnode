const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
const proxy = [{
  path: '/api/*',
  target: 'https://cnodejs.org',
  host: 'cnodejs.org',
}];

// 启动服务
const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  proxy,
  stats: {
    colors: true,
  },
});

// 将其他路由，全部返回index.html
server.app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

server.listen(3000);
