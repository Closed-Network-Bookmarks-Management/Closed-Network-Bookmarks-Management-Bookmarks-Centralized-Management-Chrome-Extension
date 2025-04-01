const webpack = require('webpack');
const path = require('path');
const fileSystem = require('fs-extra');
const { NODE_ENV } = require('./utils/env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const isDevelopment = NODE_ENV !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

const alias = {};
const secretsPath = path.join(__dirname, 'secrets.' + NODE_ENV + '.js');
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const config = {
  mode: NODE_ENV || 'development',
  entry: {
    background: path.join(__dirname, 'src/pages/Background/index.js'),
    contentScript: path.join(__dirname, 'src/pages/Content/index.js'),
    sidepanel: path.join(__dirname, 'src/pages/SidePanel/index.tsx'),
    options: path.join(__dirname, 'src/pages/Options/index.jsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias,
    extensions: fileExtensions.map(ext => '.' + ext).concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform(content) {
            const manifest = JSON.parse(content.toString());
            return Buffer.from(JSON.stringify({
              ...manifest,
              description: process.env.npm_package_description,
              version: process.env.npm_package_version
            }, null, 2));
          },
        },
        {
          from: 'src/assets/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/pages/Content/content.styles.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),

    // HTML pages
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/Options/index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/SidePanel/index.html'),
      filename: 'pages/SidePanel/index.html',
      chunks: ['sidepanel'],
      cache: false,
    }),
  ].filter(Boolean),
  infrastructureLogging: {
    level: 'info',
  },
};

if (!isDevelopment) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  };
} else {
  config.devtool = 'cheap-module-source-map';
}

module.exports = config;
