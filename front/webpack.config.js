const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
        extensions: [".jsx", ".js", ".css"],
        modules: [
            'node_modules'
        ]        
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ["@babel/preset-env", "@babel/preset-react"],
                      plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                    }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                        }
                    }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
        ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]
};
