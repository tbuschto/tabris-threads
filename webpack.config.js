require('webpack');

module.exports = {
  entry: {
    index: './src/index.ts',
    worker: './src/worker.ts'
  },
  externals: ['tabris', 'tabris-decorators'],
  plugins: [],
  devtool: 'source-map',
  mode: 'development', // Preserve class names needed in tabris-decorators
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: __dirname + '/dist',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {},
    plugins: []
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'esnext',
            moduleResolution: 'node'
          }
        }
      }
    ]
  }
};
