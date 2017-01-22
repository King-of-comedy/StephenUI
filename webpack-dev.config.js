var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractCSS = new ExtractTextPlugin('styles.css'),
    // 路径常量
    NODE_MODULE_PATH = /node_modules/,
    SRC_PATH = path.resolve(__dirname, 'sass');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
        './sass/index.js'
    ],
    output: {
        filename: 'stephen-ui.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    plugins: [
        // 热替换插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        extractCSS
    ],
    module: {
        loaders: [
            // babel转换
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: NODE_MODULE_PATH,
                include: SRC_PATH
            },
            // 样式文件
            {
                test: /\.(sc|c)ss$/,
                loader:  extractCSS.extract(['css-loader', 'sass-loader']),
                exclude: NODE_MODULE_PATH,
                include: SRC_PATH
            }
        ]
    }
};