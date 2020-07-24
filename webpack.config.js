'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const classNames = require('classnames');

let IS_MINIFIED = process.env.IS_MINIFIED;

module.exports = {
   entry: './src/index.tsx',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   devServer: {
      historyApiFallback: true
   },
   //devtool: "source-map",
   plugins: [
      new CopyWebpackPlugin({ 
         patterns: [
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/images', to: 'images' }
         ]
      })
   ],
   resolve: {
      extensions: [".ts", ".tsx", ".js", "html", '.less'],
      alias: {
         ['~']: path.resolve(__dirname + '/src'),
         react: path.resolve('./node_modules/react')
         //['style.variables.less']: path.resolve(__dirname + '/src/core/styles/style.variables.less')
      }
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: "babel-loader",
                  options: {
                     presets: ["babel-preset-env"]
                  }
               }
            ]
         },
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: "babel-loader",
                  options: {
                     presets: ["babel-preset-env"]
                  }
               },
               {
                  loader: 'ts-loader'
               }
            ]
         },
         { test: /\.html$/, loader: "html-loader" },
         { test: /\.css$/, use: ['style-loader', 'css-loader'] },
         {
            test: /\.less$/,
            use: [
               { loader: 'style-loader' }, // creates style nodes from JS strings
               { loader: 'css-loader' }, // translates CSS into CommonJS
               { loader: 'less-loader' } // compiles Less to CSS
               //{
               //   loader: 'text-transform-loader',
               //   options: {
               //      sourceMap: true,
               //      prependText: '@import "' + path.resolve(__dirname + '/src/core/styles/style.variables.less') + '";'
               //   }
               //}
            ]
         },
         {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
               loader: "file-loader",
               options: {
                  name: "[name].[ext]",
                  outputPath: 'fonts/',
                  publicPath: 'fonts/'
               }
            },
         },
         {
            test: /\.(svg|png|jpg|ico)$/,
            use: {
               loader: "file-loader",
               options: {
                  name: "[name].[ext]",
                  outputPath: '/images/',
                  publicPath: '/images/'
               },
            },
         }
      ]
   },
   performance: {
      hints: false
   },

   mode: IS_MINIFIED === 'true' ? 'production' : 'development'
};