var path          = require('path');
var webpack       = require('webpack');
var autoprefixer  = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  externals: {
    'meshblu-http': 'MeshbluHttp'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=100000&minetype=image/jpg"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&minetype=image/png"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [
      autoprefixer
    ];
  }
};
