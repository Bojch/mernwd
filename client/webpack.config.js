const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const wpconfig = {
    entry: `${SRC_DIR}/index.js`,

    output: {
        path: PUBLIC_DIR,
        filename: `index_bundle.js`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 7000,
        host: '0.0.0.0',
        //     hot: true,
        //     // open: true
        //     historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
        }),
    ],
};

module.exports = wpconfig;
