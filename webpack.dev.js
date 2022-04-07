
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
      static: "./dist",
      compress: true,
      port: 9000,
      hot: true,
      // webpack-dev-server setup
      host: 'localhost',
      proxy: {
          // The frontend code uses the backend to store
          // data. webpack-dev-server fails at this. Hence
          // redirecting frontend api requests to a different port.
          context: () => true,
          target: 'http://localhost:80',
          secure: false
      }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name : '[name].[ext]',
                        }
                    }
                ],
            }       
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
    ],
  
}
