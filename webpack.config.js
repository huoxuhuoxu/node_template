
var path = require('path');
var webpack = require('webpack');

// js文件 就是生产环境打包文件目录,有需要自行更改...

module.exports = (options = {}) => {
    if(options.dev){
        return {
             entry: {
                build: "./public/jsx/app.jsx",
            },
            output: {
                path: path.resolve(__dirname, './public/dist'),
                publicPath: '/dist/',
                filename: '[name].js'
            },
            module: {
                rules: [
                    {
                        test: /\.(jsx|js)$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'stage-0', 'react'],
                            plugins: ['transform-runtime']
                        },
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader',
                        ]
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 10000
                                }
                            }
                        ],
                    }
                ]
            }
        }
    }
};



