const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanPlugin = require('./plugins/clean-plugin')
// const CountTimePlugin = require('./plugins/countTime-plugin')

// 下载自写的plugin测试
// const CleanPlugin = require('webpack-clean-files-plugin')
// const CountTimePlugin = require('count-time-plugin')


module.exports = {
    entry: './src/js/index.js',

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: false
    },

    // 配合modules里的 loader路径.一次性设置好 所有的loader路径，先从下载的node_modules文件夹下找，找不到，再从loaders文件里找
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    },
    module: {
        rules: [

            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },

            {
                test: /\.js$/i,
                use: [{
                    // loader: path.resolve(__dirname, 'loaders/replace-loader.js'),
                    loader: 'replace-loader',
                    options: {
                        name: 'hello'
                    },
                }],
            },


            {
                test: /\.md$/i,
                use: [{
                        loader: 'html-loader',
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            html: true,
                            linkify: true,
                        }
                    },
                ]
            }

        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/views/index.html',
            title: 'markdown',
        }),
        new CleanPlugin({ exclude: 'hello' }),
        new CountTimePlugin()
    ],
}