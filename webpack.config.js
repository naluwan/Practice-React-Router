const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

const createSCSSRules = (isModule) => {
  const moduleOptions = isModule
    ? {
        importLoaders: 1,
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      }
    : {};
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        ...moduleOptions,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        implementation: require('sass'),
        additionalData: `
          $DEV_MODE: ${DEV_MODE};
        `,
      },
    },
  ];
};

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: path.resolve('src'),
  mode: process.env.NODE_ENV,
  entry: {
    app: ['./index.jsx'],
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    filename: DEV_MODE ? '[name].js' : '[name]-[chunkhash].js',
    chunkFilename: DEV_MODE ? '[name]-chunk.js' : '[name]-chunk-[chunkhash].js',
    publicPath: '/',
    path: path.resolve('dist'),
  },
  resolve: {
    modules: [path.resolve('src'), path.resolve('node_modules')],
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
        include: path.resolve('src'),
      },
      {
        test: /\.scss$/,
        include: path.resolve('src'),
        oneOf: [
          {
            test: /\.module.scss$/,
            use: createSCSSRules(true),
          },
          {
            test: /\.scss$/,
            use: createSCSSRules(false),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[path][name].[ext]?[hash:10]',
            },
          },
        ],
        include: path.resolve('src/img'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: DEV_MODE ? 'app.css' : 'app-[contenthash].css',
    }),
    DEV_MODE && new ReactRefreshWebpackPlugin(),
    // https://webpack.js.org/plugins/define-plugin/
    new Webpack.DefinePlugin({}),
  ].filter(Boolean),
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // HTML5 History API
    historyApiFallback: true,
    port: 3000,
    hot: true,
    // 可以用 ip 連線，預設是 localhost
    host: '0.0.0.0',
    proxy: [
      {
        context: ['/api'],
        // target: 'https://k9wvmn0z75.sse.codesandbox.io',
        target: 'https://milkmidi-api-example-server.herokuapp.com',
        changeOrigin: true,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
};
