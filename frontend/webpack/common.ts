delete process.env.TS_NODE_PROJECT;

import { Configuration } from 'webpack';
import path from 'path';

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/static/index.html'),
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      /*
                       * コンパイル後のJSがどのブラウザまで動くようにするかの設定。
                       * デフォルトの設定にie 11を追加する
                       * デフォルト: "> 0.5%, last 2 versions, Firefox ESR, not dead"
                       *
                       * 参考
                       *   https://babeljs.io/docs/en/babel-preset-env
                       *   https://github.com/browserslist/browserslist
                       */
                      browsers:
                        '> 0.5%, last 2 versions, Firefox ESR, not dead',
                    },

                    /*
                     * 必要なpolyfillのみコンパイルに含める
                     * 参考: https://aloerina01.github.io/blog/2019-06-21-1#3-transform-runtime-%E3%82%92%E4%BD%BF%E3%81%86%E6%96%B9%E6%B3%95
                     */
                    useBuiltIns: 'usage',
                    corejs: 3,

                    /*
                     * モジュール化方法をCommonJS方式（require）に変換
                     * （useBuiltIns: "usage"の場合、指定しないとIE11でうまく動かなかった）
                     * 参考
                     *   https://babeljs.io/docs/en/babel-preset-env#modules
                     *   http://ytyaru.hatenablog.com/entry/2019/03/29/000000
                     */
                    // modules: "cjs",
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: ['relay'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              context: path.resolve(__dirname, '../'),
              configFile: path.resolve(__dirname, '../tsconfig.webpack.json'),
            },
          },
          'eslint-loader',
        ],
        exclude: [/core-js/, /node_modules/],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: false } },
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.png|svg|gif|jpg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.webpack.json'),

        // https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32
        baseUrl: path.resolve(__dirname, '../'),
      }),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
export default commonConfig;
