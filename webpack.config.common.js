const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/core/core.ts',
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
                test: /\.css$/,
                loaders: ['raw-loader']
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ]
};