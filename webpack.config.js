const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build/[name].js",
    path: __dirname,
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "aframe-super-hot-loader"],
      },
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: [
          "aframe-super-hot-html-loader",
          {
            loader: "html-require-loader",
            options: {
              root: path.resolve(__dirname, "src"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
  },
};
