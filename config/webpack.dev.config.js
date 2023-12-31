const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 公共配置

const devConfig = {
    mode: 'development', // 开发模式
    entry: path.join(__dirname, "../demo/src/index.jsx"), // 入口，处理资源文件的依赖关系
    output: {
        path: path.join(__dirname, "../demo/src/"),
        filename: "dev.js",
    },
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 启用 CSS 模块
                        },
                    },
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]', // 自定义类名生成规则
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /.min.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, '../demo/src/'),
        compress: true,
        host: '127.0.0.1',
        port: 8686, // 启动端口
        open: true // 打开浏览器
    },
};
module.exports = merge(devConfig, baseConfig); // 合并配置
