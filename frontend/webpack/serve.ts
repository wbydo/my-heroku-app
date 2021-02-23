import { Configuration, DefinePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import config from 'config';

import commonConfig from './common';

const frontendPort: number = config.get<number>('frontend.port');
const serversidePort: number = config.get<number>('serverside.port');

const devConfig: Configuration = merge(commonConfig, {
  mode: 'development',

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, '../dist'),
    port: frontendPort,
    proxy: {
      '/api': {
        target: `http://localhost:${serversidePort}/`,
        pathRewrite: { '^/api': '' },
        secure: false,
        logLevel: 'debug',
      },
    },
    historyApiFallback: true
  },

  devtool: 'source-map',

  plugins: [
    new DefinePlugin({
      MY_SCREEN_NAMES: JSON.stringify({ hoge: 'hoge' }),
    }),
  ],
});

export default devConfig;
