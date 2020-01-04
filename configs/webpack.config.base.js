/**
 * Base webpack config used across other specific configs
 */

import path from "path";
import webpack from "webpack";
import { dependencies } from "../package.json";

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, "..", "app"),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: "commonjs2",
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "..", "app"),
    },
    extensions: [".js", ".ts", ".tsx", ".json"],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
