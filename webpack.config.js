const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: [
        "./source/Index.ts"
    ],
    output: {
        filename: "app.js",
        path: __dirname + "/output/",
        publicPath: "/output/"
    },

    resolve: {
        extensions: ["", ".ts"],
        exclude: [/node_modules/]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loaders: ["babel", "ts-loader?configFileName=webpack.tsconfig.json"]
            }
        ]
    }
};