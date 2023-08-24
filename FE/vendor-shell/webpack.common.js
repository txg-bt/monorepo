const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

const federationConfig = require('./federation.config.json');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: {
    app: './src/index',
  },
  plugins: [
    new ModuleFederationPlugin({
      ...federationConfig,
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-router-dom'],
        },
        'styled-components': {
          singleton: true,
          eager: true,
          requiredVersion: deps['styled-components'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  output: {
    filename: 'client_[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Update with your desired output directory for images
            },
          },
        ],
      },
    ],
  },
};
