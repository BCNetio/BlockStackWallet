const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require('dotenv').config();

const publicFolder = path.resolve(__dirname, 'public');
const srcFolder = path.resolve(__dirname, 'app');

const isProd = process.env.NODE_ENV === 'production';

const cssFilename = isProd ? 'styles.[chunkhash].css' : 'styles.css';

const getPlugins = () => {
  const basePlugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'API_URL', 'STATIC_URL']),

    new webpack.optimize.SplitChunksPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(srcFolder, isProd ? 'index.html' : 'devIndex.html'),
    }),
  ];
  /*
  *   List of production plugins
  */
  const prodPlugins = [
    new CleanWebpackPlugin(publicFolder, {
      root: __dirname,
      verbose: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
      allChunks: true,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        keep_fnames: true,
        keep_classnames: true,
        mangle: {
            reserved: [
              'Buffer', 'BigInteger', 'Point', 'ECPubKey',
              'ECKey', 'sha512_asm', 'asm', 'ECPair', 'HDNode'
            ],
        }
      }
    })
  ];

  return basePlugins.concat(
    isProd
      ? prodPlugins
      : [
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin({
          seed: {
            name: 'Dappy Wallet',
            start_url: 'localhost:8080',
            description: 'A simple demo of Blockstack Auth',
            icons: [
              {
                src: 'https://avatars2.githubusercontent.com/u/3184538?s=400&v=4',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
        }),
        new webpack.DllReferencePlugin({
          context: publicFolder,
          manifest: require(path.resolve(__dirname, './bundleLibs/lib_1.json')),
        }),
        new webpack.DllReferencePlugin({
          context: publicFolder,
          manifest: require(path.resolve(__dirname, './bundleLibs/lib_2.json')),
        }),
      ],
  );
};

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: isProd ? false : 'source-map',

  entry: {
    vendor: ['redux', 'ramda', 'redux-saga', 'react-redux', 'react', 'react-dom', 'babel-polyfill', 'immutable'],
    app: [
      'whatwg-fetch',
      path.resolve(srcFolder, 'index.css'),
      path.resolve(srcFolder, 'index.js'),
    ],
  },

  output: {
    path: publicFolder,
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  },

  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },

  devServer: {
    host: process.env.WEBPACK_DEV_SERVER_HOST,
    port: process.env.WEBPACK_DEV_SERVER_PORT,
    inline: true,
    hot: !isProd,
    contentBase: './public',
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: srcFolder,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: isProd ? [] : ['transform-runtime', 'react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: isProd
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
          })
          : ['css-hot-loader', 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg|\.png|\.jpg$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name]-[hash:8].[ext]',
          },
        },
      },
    ],
  },

  plugins: getPlugins(),
};
