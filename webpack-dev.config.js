const path = require("path");
const merge = require("webpack-merge");

const baseConfig = require("./webpack-base.config");

module.exports = merge(baseConfig, {
    entry: "./src/main",
    output: {
        path: __dirname + "/dist",
        filename: "out.js"
    },
    devtool: "source-map"
});
