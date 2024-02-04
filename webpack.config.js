const path = require('path');

module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'TinyMath',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      // 使用 ts-loader 处理 TypeScript 文件
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.build.json',
              compilerOptions: { declaration: false },
            },
          },
        ],
      },
    ],
  },

  // 指定是否生成 source map 文件
  devtool: 'source-map',
  mode: 'production',
};
