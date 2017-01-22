/**
 * Created by fnjoe on 2016/12/16.
 */
var express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    app = express(),
    config = require('./webpack-dev.config'),
    compiler = webpack(config),
    port = 9527;

// 静态资源处理
app.use(express.static(__dirname));

// webpack热替换
app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    stats: {
        colors: true,
        cached: false
    },
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// redirect root location to demos index
app.use(/\/$/, function(req, res) {
    res.redirect('./examples/index.html');
});

app.listen(port, function () {
    console.log('Listening at http://localhost:' + port);
});