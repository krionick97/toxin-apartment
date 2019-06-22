const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [

      new OptimizeCssAssetsPlugin({}),
      new UglifyJsPlugin({})
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4200
  },
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
          global: 'jQuery'
        }
      ]
    }),
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/pug/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
    new CopyPlugin([
      { from: 'src/img', to: 'img' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      // {
      //   test: /\.svg$/,
      //   use: 'file-loader',
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name].[ext]'
      //       },
      //     }
      //   ]
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: [
      //     'url-loader?limit=10000',
      //     'img-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
    ]
  },
}