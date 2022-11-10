const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

// load env variable with dotenv
require('dotenv').config({ path: `./${process.env.ENV_PATH || 'envs/dev.env'}` }); 
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost'

publicPath = "/";

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] 
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: `./public/favicon.ico`,
      template: `./public/index.html`,
      manifest: `./public/manifest.json`,
      filename: "index.html", // output file
      inject: false 
    }),
    new webpack.DefinePlugin({
      AUTH_URL: JSON.stringify(process.env.AUTH_URL)
    }),
    new TsconfigPathsPlugin(), 
  ],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath
  },
  devServer: {
    host: host,
    port: port,
    open: false,
    historyApiFallback: true
  }
};