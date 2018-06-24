const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const publicFolder = path.resolve(__dirname, 'public');
module.exports = {
   mode: process.env.NODE_ENV,
   context: process.cwd(),
   resolve: {
      extensions: ['.js', '.jsx', '.json', '.less', '.css'],
      modules: [__dirname, 'node_modules']
   },

   entry: {
      lib_1: ["redux", "ramda", "redux-saga", "react-redux", "lodash"],
      lib_2: ["react", "react-dom"],
   },
   output: {
      filename: '[name].dll.js',
      path: publicFolder,
      library: '[name]'
   },
   plugins: [
     new webpack.DllPlugin({
      name: '[name]',
      path: `bundleLibs/[name].json`
   })
]
};
