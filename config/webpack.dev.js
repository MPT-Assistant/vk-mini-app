const path = require("node:path");

const webpack = require(`webpack`);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "../src/main.tsx"),
    devServer: {
        hot: true,
        server: {
            type: "https",
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/env",
                        "@babel/preset-react",
                        "@babel/typescript",
                    ],
                    plugins: [
                        "@babel/proposal-class-properties",
                        "@babel/proposal-object-rest-spread",
                    ],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },

            {
                test: /\.svg$/,
                type: "asset/resource",
                use: ["svgo-loader"],
                generator: {
                    filename: "static/media/[hash][ext][query]",
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash][ext][query]",
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash][ext][query]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        fallback: {
            buffer: require.resolve("buffer/"),
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
        new NodePolyfillPlugin()
    ],
};
