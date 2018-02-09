const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    entry: './client/core/core.aot.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: {
                        configFileName: path.resolve( path.resolve(__dirname, 'client/tsconfig.aot.json'))
                    }},
                    { loader: 'angular2-template-loader' },
                    { loader: 'angular-router-loader?aot=true' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
              keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});