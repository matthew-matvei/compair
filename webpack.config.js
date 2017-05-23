const path = require("path");

module.exports = {
    entry: "./src/main",
    output: {
        path: __dirname + "/dist",
        filename: "out.js"
    },
    devtool: "cheap-eval-source-map",
    resolve: {
        extensions: [
            ".ts",
            ".tsx",
            ".js"
        ],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    target: "node",
    node: {
        fs: "empty"
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
