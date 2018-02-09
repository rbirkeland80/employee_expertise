const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './client/polyfills.ts',
        'vendor': './client/vendor.ts',
        'app': './client/core/core.ts'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loaders: ['url-loader?limit=20000']
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'node_modules')],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    publicPath: '/'
                })
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ]
};