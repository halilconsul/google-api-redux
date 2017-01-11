var webpack = require('webpack');

module.exports = {
   entry: "./src/main.js",
   output: {
      path: __dirname + '/public/build/',
      publicPath: "build/",
      filename: "bundle.js"
   },
   module: {
      loaders: [
         {
            test: /\.js$/,
            loader: "babel",
            exclude: [/node_modules/, /public/]
         },
         {
            test: /\.jsx$/,
            loader: "babel",
            exclude: [/node_modules/, /public/]
         },
         {
            test: /\.scss$/,
            loader: "style-loader!css-loader!postcss-loader!sass",
            exclude: [/node_modules/, /public/]
         },
      ]
   },
}
