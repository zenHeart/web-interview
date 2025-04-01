```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // 设置模式，可选值: development, production, none
  mode: 'production',

  // 入口文件配置
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom']
  },

  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: '[name].[contenthash].js', // 输出文件名
    chunkFilename: '[name].[contenthash].chunk.js', // 非入口chunk的名称
    clean: true // 构建前清空输出目录
  },

  // 模块解析配置
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 自动解析的扩展名
    alias: {
      '@': path.resolve(__dirname, 'src') // 创建别名
    }
  },

  // 模块处理规则
  module: {
    rules: [
      // JavaScript/TypeScript 处理
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            cacheDirectory: true // 启用缓存
          }
        }
      },
      // CSS 处理
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取CSS到单独文件
          'css-loader', // 解析CSS
          'postcss-loader' // 处理CSS前缀等
        ]
      },
      // 图片处理
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset', // webpack5的新资源模块类型
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片转为base64
          }
        },
        generator: {
          filename: 'images/[hash][ext][query]' // 输出到images文件夹
        }
      },
      // 字体处理
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]' // 输出到fonts文件夹
        }
      }
    ]
  },

  // 插件配置
  plugins: [
    // 生成HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // 提取CSS
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    })
  ],

  // 优化配置
  optimization: {
    minimize: true, // 启用压缩
    minimizer: [
      // 压缩JS
      new TerserPlugin({
        extractComments: false, // 不提取注释
        terserOptions: {
          compress: {
            drop_console: true // 移除console
          }
        }
      }),
      // 压缩CSS
      new CssMinimizerPlugin()
    ],
    // 代码分割配置
    splitChunks: {
      chunks: 'all', // 对所有模块进行分割
      cacheGroups: {
        // 第三方库分组
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        // 公共模块分组
        common: {
          name: 'common',
          minChunks: 2, // 至少被引用两次才会被提取
          chunks: 'all',
          priority: 5
        }
      }
    }
  },

  // 开发服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, 'public') // 静态资源目录
    },
    compress: true, // 启用gzip压缩
    port: 8080, // 端口号
    hot: true, // 热更新
    historyApiFallback: true, // 支持SPA路由
    open: true // 自动打开浏览器
  },

  // source map 配置
  devtool: 'source-map', // 生产环境可改为 'hidden-source-map'

  // 缓存配置
  cache: {
    type: 'filesystem' // 使用文件系统缓存
  },

  // 性能提示配置
  performance: {
    hints: 'warning', // 警告，而不是错误
    maxAssetSize: 512000, // 单个资源最大大小 (500kb)
    maxEntrypointSize: 512000 // 入口资源最大大小 (500kb)
  }
}
```
