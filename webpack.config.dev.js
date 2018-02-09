const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    // entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './client/core/core.ts'],
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        // publicPath: 'http://localhost:3001/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    watchOptions: {
        ignored: "!client/**"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: {
                        configFileName: path.resolve( path.resolve(__dirname, 'client/tsconfig.json')),
                        transpileOnly: true
                    }},
                    { loader: 'angular2-template-loader' },
                    { loader: 'angular-router-loader' }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});