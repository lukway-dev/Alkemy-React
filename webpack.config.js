const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@heroes': path.resolve(__dirname, 'src/assets/images/heroes')
    }
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(jpg|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/heroes/[name].[contenthash].png'
        },
        use: [
          'url-loader',
        ]
      }, {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash].svg'
        },
        use: [
          'url-loader',
          'svgo-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './index.css'
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['optipng', { optimizationLevel: 5 }]
        ]
      }
    }),
    new CleanWebpackPlugin(),
    new Dotenv()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}