// Generated using webpack-cli https://github.com/webpack/webpack-cli

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line eqeqeq
const isProduction = process.env.NODE_ENV == 'production';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');

const tsConfig = {
  entry: {
    init: './src/assets/scripts/init.ts',
    run: './src/assets/scripts/run.ts',
    top: './src/assets/scripts/top.ts'
  },
  output: {
    path: path.join(__dirname, 'public/assets/scripts')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      }

      /*
       * Add your rules for custom modules here
       * Learn more about loaders from https://webpack.js.org/loaders/
       */
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'For license information please see LICENSE.txt'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

const tsProductionConfig = {
  entry: {
    init: './src/assets/scripts/init.ts',
    run: './src/assets/scripts/run.ts',
    top: './src/assets/scripts/top.ts'
  },
  output: {
    path: path.join(__dirname, 'public/assets/scripts')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      }

      /*
       * Add your rules for custom modules here
       * Learn more about loaders from https://webpack.js.org/loaders/
       */
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'For license information please see LICENSE.txt'
    }),
    new LicenseCheckerWebpackPlugin({
      emitError: true,
      allow: `(${[
        'BSD-3-Clause',
        'BSD-2-Clause',
        'MIT',
        'ISC',
        'Apache-2.0',
        'W3C-20150513',
        'CC0-1.0'
      ].join(' OR ')})`,
      outputFilename: './LICENSE.txt'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

module.exports = ({resource}) => {
  const config = [tsConfig];

  // eslint-disable-next-line eqeqeq
  if (resource == 'typescript') {
    config.splice(0);
    config.push(tsConfig);
  }

  // eslint-disable-next-line eqeqeq
  if (resource == 'producttypescript') {
    config.splice(0);
    config.push(tsProductionConfig);
  }

  return config.map((c) => {
    c.mode = isProduction ? 'production' : 'development';

    return c;
  });
};
