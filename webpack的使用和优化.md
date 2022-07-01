# vue-cli简单实现

## 初始化npm和webpack

 新建一个文件夹**my-vue-cli**用来存放项目,执行命令之后，剩下的操作一直默认就好

- `webpack`：打包的工具
- `webpack-cli`：为webpack提供命令行的工具

```
npm init
npm i webpack webpack-cli -D
```



## 项目文件目录构建

在根目录下新建`src、public`这两个文件夹，前者用来放置项目主要代码，后者用来放项目公用静态资源

- 新建`public/index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my-vue-cli</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
  ```

- `src/main.js`

```js
console.log('我是main.js')
```



## entry、output 

刚刚的`main.js`就是我们的入口文件，也就相当于整个引用树的根节点，webpack打包需要从入口文件开始查找，一直到打包所有引用文件。

进行入口、输出文件的配置，在根目录下新建`webpack.config.js`：

```js
const path = require('path')

module.exports = {
  // 模式 开发模式
  mode: 'development',
  // 入口文件 main.js
  entry: {
    index: './src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    path: path.resolve(__dirname, './dist'),
    // js文件下
    filename: 'js/[name].[contenthash].js',
    // 打包前清理dist文件夹
    clean: true,
  }
}
```



## loader和plugin

- `loader`：webpack本身只能解析js文件，使webpack拥有解析非js文件的能力，如css、png、ts等等
- `plugin`：捕抓webpack解析过程的抛出的hooks，拓展webpack的打包功能，如优化体积、显示进度条等等



## 打包html

需要用到`html-webpack-plugin`这个插件

```
npm i html-webpack-plugin -D
```

并且需要在`webpack.config.js`中配置一下

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板
      template: './public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件插入 body里
      inject: 'body',
    }),
  ]
}
```



## 打包CSS

以`sass`为例，需要安装以下几个东西：

- `sass、sass-loader`：可以将scss代码转成css
- `css-loader`：使webpack具有打包css的能力
- `sass-resources-loader`：可选，支持打包全局公共scss文件
- `mini-css-extract-plugin`：可将css代码打包成一个单独的css文件

```
npm i -D sass sass-loader sass-resources-loader mini-css-extract-plugin 
```

```js
//webpack.config.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
      module: {
    rules: [
      {
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序：右-->左
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       // 放置全局引入的公共scss文件
          //     ],
          //   },
          // },
        ],
      },
    ]
  }
  plugins: [
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/[name].[contenthash].css',
      ignoreOrder: true,
    }),
  ],

}
```



## 打包图片

webpack 中打包可以使用内置的 `asset-module`

```js
  module: {
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转base64的条件
          dataUrlCondition: {
             maxSize: 25 * 1024, // 25kb,根据自己需求设置
          }
        },
        generator: {
          // 打包到 dist/images 文件下
         filename: 'images/[contenthash][ext][query]',
        },
     }s
    ]
  }
```



## 配置babel

babel主要是把项目中的高级语法转换为低级语法，如ES6==>ES5

安装所需的包：

- `@babel/core、babel-loader`：转换语法的工具
- `@babel/preset-env`：转换的一套现成规则
- `@babel/plugin-transform-runtime`：转换async/await所需插件

```
npm i -D @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime 
```

```js
  module: {
    rules: [
      {
        // 匹配js后缀文件
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      }
    ]
  }
```

```js
// 根目录新建文件babel.config.js

module.exports = {
  presets: [
    // 配置规则
    "@babel/preset-env"
  ],
  // 配置插件
  plugins: ["@babel/plugin-transform-runtime"]
}
```



## 打包Vue

打包Vue需要用到以下几个包：

- `vue`：Vue开发所需的依赖
- `vue-loader`：解析`.vue`文件的loader
- `vue-template-compiler`：解析vue中模板的工具
- `@vue/babel-preset-jsx`：支持解析vue中的jsx语法

```
npm i -D vue vue-loader vue-template-compiler @vue/babel-preset-jsx
```

```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      }
    ]
  }
}
```

`babel.config.js`中配置一下，让webpack支持`.vue`文件中的`jsx`语法

```js
//babel.config,js
module.exports = {
  presets: [
     // 配置规则
    "@babel/preset-env",
    // 支持vue中的jsx语法
    "@vue/babel-preset-jsx"
  ],
  plugins: ["@babel/plugin-transform-runtime"]
}
```

## 配置路径别名

配置一下别名`alia`。配置别名也会加快webpack解析时对的遍历速度

```js
module.exports = {
  // 刚才的代码...
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
      utils: '~/utils'
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue'],
  },
}
```



## webpack-dev-server

开启`dev-server` ，检测文件的变化实现热更新，实质是把打包文件放在了内存中

```
npm i webpack-dev-server -D
```

```js
//webpack.congfig.js
module.exports = {
       devServer: {
        //默认端口
        port: 8000,
        //静态文件目录
        static: path.join(__dirname, "./dist"),
        // 开启代理，解决跨域问题
        proxy: {
            // 示例,/api访问到 http://loachost:3001/api
            // "/api": "http://loachost:3001"，
            // /api访问到 http://loachost:3001/
            api: {
                target: 'http://loachost:3001',
                pathRewrite: { '^/api': '' },
            },
        },
        //热更新
        hot: true,
        // 是否压缩传输,压缩头部，可以减少传输的大小
        compress: true,
        client: {
            //关闭在浏览器上面显示错误
            overlay: false,
        },
    },
}
```



## 构建区分环境

- `开发环境`：开启`source-map`和去除代码压缩、gzip、体积分析等优化的配置，大大提高构建速度
- `生产环境`：需要代码压缩、gzip、体积分析等优化的配置，大大降低最终项目打包体积

分为三个文件：

- 公共配置文件： `webpack.config.common.js`
  - 入口`entry` 、输出`output` 
  - 解析module规则`module`
  - 进度条展示
  - 路径别名
- 开发配置文件：``webpack.config.dev.js`
  - webpack-dev-server
  - 不同的source-map模式
  - 不同的环境变量

- 生产配置文件：``webpack.config.prod.js`
  - 不同的source-map模式
  - 不同的环境变量


利用`webpack-merge`进行对象深层合并

```
npm i webpack-merge -D
```

然后对`webpack.config.js` 进行拆分，新建文件夹build创建`webpack.config.common.js`、`webpack.dev.js`、`webpack.config.prod.js`

- webpack.config.common.js

```js
// 公共配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // 入口文件 main.js
  entry: {
    main: '../src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    // 每次打包前自动清除旧的dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: '../public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件注入 body里
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css|s[cs]ss)$/,
        use: [
          // 注意loader的执行顺序 右-->左
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       // 放置全局引入的公共scss文件
          //     ],
          //   },
          // },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb，根据自己需求配置
          }
        },
        generator: {
          // 打包到 dist/image 文件下
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      }
    ]
  },
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets'
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue']
  },
}
```

- `webpack.config.dev.js`

```js
const path = require('path')
const { merge } = require('webpack-merge')
const CommonConfig = require("./webpack.config.common")

module.exports = merge(base, {
  mode: 'development',
    devServer: {
        //启动端口
        port: 8000,
        static: path.join(__dirname, "../dist"),
        // 开启代理，解决跨域问题
        proxy: {
            // 示例,/api访问到 http://loachost:3001/api
            // "/api": "http://loachost:3001"，
            // /api访问到 http://loachost:3001/
            api: {
                target: 'http://loachost:3001',
                pathRewrite: { '^/api': '' },
            },
        },
        //热更新
        hot: true,
        // 是否压缩传输,压缩头部，可以减少传输的大小
        compress: true,
        client: {
            //关闭在浏览器上面显示错误
            overlay: false,
        },
    },
})
```

- `webpack.config.prod.js`

```js
// 生产环境
const { merge } = require('webpack-merge')
const CommonConfig = require("./webpack.config.common")

module.exports = merge(base, {
  mode: 'production'
})
```

- package.json配置

```json
{
  "scripts": {
    "serve": "webpack serve --config ./build/webpack.config.dev",
    "build": "webpack --config ./build/webpack.config.prod"
  },
}
```



## source-map

`source-map`的作用：代码报错时，能快速定位到出错位置

- 开发环境：使用`eval-cheap-module-source-map`模式
- 生成环境：如果生产环境需要启用，使用`nosources-source-map`

```js
//webpack.config.dev.js
module.exports = merge(CommonConfig, {
  devtool: 'eval-cheap-module-source-map'
})
```

```js
//webpack.config.prod.js
module.exports = merge(CommonConfig, {
  devtool: 'eval-cheap-module-source-map'
})
```

## 

## 构建进度条

需要先安装进度条的插件`progress-bar-webpack-plugin`

```
npm i progress-bar-webpack-plugin -D
```

```js
// webpack.congig.common.js
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  plugins: [
    new ProgressBarPlugin({
      format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    })
  ],
}
```

## 环境变量

配置环境变量:

- `devlopment`

```js
//webpack.config.dev.js
const webpack = require('webpack')

module.exports = merge(CommonConfig, {
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('development'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
  ]
})
```

- `production`

```js
//webpack.config.prod.js
const webpack = require('webpack')

module.exports = merge(CommonConfig, {
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('prodction'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
  ]
})
```



# 配置代码和提交规范

- `Eslint`：更侧重于规范JS语法
- `Prettier`：更侧重于规范JS的编写规范
- `Stylelint`：规范Css
- `husky`：规范git提交

## ESLint配置

一般来说只有开发环境才需要规范语法，安装一下这些包

- `eslint`：Eslint的依赖包
- `eslint-config-airbnb-base`：Eslint的现成方案
- `eslint-plugin-import`：支持Eslint拓展配置
- `eslint-webpack-plugin`：将Eslint配置在webpack中的插件

```
npm i eslint eslint-config-airbnb-base eslint-plugin-import eslint-webpack-plugin
```

vscode安装一下**ESLint**插件,会自动读取`.eslintrc.js`中的配置进行错误提示 ，创建两个文件：

- `.eslintrc.js` ：Eslint的配置

```js
// .eslintrc.js

module.exports = {
  // 不往父级查找
  root: true,
  // 环境配置
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  // 拓展规则
  extends: 'airbnb-base',
  // 自定义规则，会覆盖一部分拓展规则
  // 具体这些参数代表什么规则，可以去eslint官网看
  rules: {
    'no-console': 'warn',
    semi: 'off',
    'eol-last': 'off',
    'no-new': 'off',
    'arrow-parens': 'off',
    'import/no-extraneous-dependencies': 'off',
    'comma-danger': 'off',
    'no-useless-escape': 'off'
  },
  // 语言风格
  parserOptions: {
    // 支持import
    sourceType: 'module'
  }
}
```

- `.eslintignore` ：忽略哪些文件的Eslint检测，

```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
```



## Prettier配置

需要在开发中提示可以在VsCode安装插件`Prettier - Code formatter` 

需要安装这些插件

- `prettier`：Prettier规范的依赖
- `eslint-plugin-prettier`：能让`Eslint`配置`Prettier`插件

```
npm i -D prettier eslint-plugin-prettier
```

```js
// .eslintrc

module.exports = {
  // 拓展插件
  plugins: ['prettier'],
  // 自定义规则，会覆盖一部分拓展规则
  rules: {
	//...
    // prettier提示报错
    'prettier/prettier': 'error'
  },
}

```

## Stylelint配置

可以安装一下vscode的插件`Stylelint`

需要安装下面的

- `stylelint`：Stylelint的依赖
- `stylelint-config-prettier`：拓展Stylelint的规则
- `stylelint-config-standard`：拓展Stylelint的规则
- `stylelint-order`：拓展Stylelint样式顺序的插件
- `stylelint-webpack-plugin`：将Stylelint配置到webpack 的插件

```
npm i -D stylelint stylelint-config-prettier stylelint-config-standard stylelint-order stylelint-webpack-plugin
```

- 新建`stylelint.config.js`文件，配置`Stylelint`

```js
// stylelint.config.js

module.exports = {
  root: true,
  // 拓展插件
  plugins: ['stylelint-order'],
  // 拓展stylelint的规则
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // 自定义规则
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    // 自定义顺序
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      {
        severity: 'warning',
      },
    ],
    // 按照指定顺序排列样式 位置->布局->修饰->动效/转变->其他
    'order/properties-order': [
      'position',
      'content',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak',
    ],
  },
  // 忽视文件
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
```

- 配置到`webpack`开发环境中

```js
//webpack.config.dev.js

const path = require('path')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

module.exports = merge(base, {
  plugins: [
    new StylelintWebpackPlugin({
      context: 'src',
      // Stylelint的配置文件读取
      configFile: path.resolve(__dirname, '../stylelint.config.js'),
      // 检查的文件范围
      files: ['**/*.scss'],
    }),
  ]
})
```

- 配置命令，每次执行命令会自动修复

  ```
  npm run lint:style
  ```

```json
//package.json

{
   "scripts": {
    "lint:style": "stylelint src/**/*.scss --fix"
  },
}
```

## husky配置

`husky`就是用来规范你的`git提交`的规则的，检测提交代码`commit`的`Eslint`、`Stylelint`

需要安装下面这些包

- `husky`：husky所需的依赖
- `lint-staged`：用来检测提交缓存区的代码的规范，如果不符合规范就阻止git commit
- `@commitlint/cli`：规定git commit文本规范的依赖
- `@commitlint/config-conventional`：规定git commit文本规范的拓展规则

```
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

- 配置命令

```json
  "scripts": {
    "prepare": "husky install"
  },
```

这个命令的作用就是：当你项目初始`npm i`之后，他会自动运行这个`husky install`的命令，然后你的项目中就会出现`.husky文件夹`

在`.husky`文件夹中创建两个文件

- `pre-commit`：commit前所要做的事

​	这个文件是用来执行代码`git commit`前所做的事，需要对提交缓存区里的代码进行`Eslint、Stylelint`的检验，如果检验到代码有语法错误，则阻止`git commit`

 首先配置命令

```json
//package.json
{
	"scripts": {
    "lint-staged": "lint-staged"
  	},
}
```

 之后根目录新建配置.lintstagedrc

```
// .lintstagedrc

{
  "*.js": "eslint --fix",
  "*.scss": "stylelint --fix"
}

```

最后配置`.husky/pre-commit` 执行 npm run lint-staged

```
// .husky/pre-commit

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```



- `commit-msg`：commit文本检验的触发文件

需要先在根目录下新建一个`commitlint.config.js`，用来配置git commit的文本规范

```js
// commitlint.config.js

module.exports = {
  // ↓忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // ↓按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // 自定义解析器
  parserPreset: {
    // 解析器配置
    parserOpts: {
      // commit 提交头的规则限制
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      // 匹配分组
      headerCorrespondence: ['type', 'scope', 'subject'],
      // 引用
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved',
      ],
      // 对应issue要携带#符号
      issuePrefixes: ['#'],
      // 不兼容变更
      noteKeywords: ['BREAKING CHANGE'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      // warn () { },
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  // ↓自定义提交消息规则
  rules: {
    // ↓body以空白行开头
    'body-leading-blank': [2, 'always'],
    // ↓footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject为空
    'subject-empty': [2, 'never'],
    // ↓type为空
    'type-empty': [2, 'never'],
    // ↓type的类型
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
        'update',
      ],
    ],
  },
}
```

然后我们只需要在`commit-msg`文件中取读取这个规范，并对提交文本进行相对应的规范就行

```
// commit-msg

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```



## .gitignore

忽略git提交的文件夹

```
//.gitignore

node_modules
```



# webpack优化

## 构建时间优化

### thread-loader

开启多进程打包，可以大大提高构建的速度，使用方法是将`thread-loader`放在比较费时间的loader之前，比如`babel-loader`

```
npm i thread-loader -D
```

```js
// webpack.common.js
{
 	test: /\.js$/,
        use: [
            'thread-loader',
            'babel-loader'
        ],
	}
}
```



### cache-loader

缓存资源，提高二次构建的速度，使用方法是将`cache-loader`放在比较费时间的loader之前，比如`babel-loader`

```
npm i cache-loader -D
```

```js
// webpack.confing.common.js
{
 	test: /\.js$/,
        use: [
            'cache-loader',
            'thread-loader',
            'babel-loader'
        ],
	}
}
```



### 开启热更新

缓存资源，提高二次构建的速度，使用方法是将`cache-loader`放在比较费时间的loader之前，比如`babel-loader`

```js
// webpack.confing.dev.js

//引入webpack
const webpack = require('webpack');
//使用webpack提供的热更新插件
plugins: [
    new webpack.HotModuleReplacementPlugin()
],
//devserver中开启
devServer: {
    hot: true
},
```

### exclude & include

- `exclude`：不需要处理的文件
- `include`：需要处理的文件

合理设置这两个属性，可以大大提高构建速度

```js
// webpack.confing.common.js

      {
        test: /\.js$/,
        //使用include来指定编译文件夹
        include: path.resolve(__dirname, '../src'),
        //使用exclude排除指定文件夹
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
```



### CSS代码压缩

CSS代码压缩使用`css-minimizer-webpack-plugin`，效果包括压缩、去重

```
npm i css-minimizer-webpack-plugin -D
```

```js
// webpack.confing.prod.js

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
    ],
  }
```



### JS代码压缩

webpack会自动开启开箱即用的`terser-webpack-plugin`插件，由于开启了Css压缩这个需要再配置一下

```js
// webpack.confing.prod.js

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

  optimization: {
    minimizer: [
       new TerserPlugin(),
    ],
  }
```



### tree-shaking

`tree-shaking`简单说作用就是：只打包用到的代码，没用到的代码不打包，而`webpack5`默认开启`tree-shaking`，当打包的`mode`为`production`时，自动开启`tree-shaking`进行优化

```js
module.exports = {
  mode: 'production'
}
```



### source-map类型

`source-map`的作用是：方便你报错的时候能定位到错误代码的位置。它的体积不容小觑，所以对于不同环境设置不同的类型是很有必要的。

- 开发环境

```js
// webpack.confing.dev.js

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map'
}
```

- 生产环境

​		生产环境，如果需要开启`source-map`,一般可以选择`nosources-source-map`

```js
// webpack.config.prod.js

module.exports = {
  mode: 'production',
  devtool: 'nosources-source-map'
}
```



### 打包体积分析

使用`webpack-bundle-analyzer`可以审查打包后体积分布的依赖图，进而进行相应的体积优化

```
npm i webpack-bundle-analyzer -D
```

```js
// webpack.config.prod.js

const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

  plugins: [
    new BundleAnalyzerPlugin(),
]
```

### package.json配置文件

- **sideEffects：**生产环境打包的时候，会默认开启`tree-shaking`，如果不设置`sideEffects`，某些通过`import`方式引入的css文件可能不会被打包，因为tree-shaking会甩掉没有导出任何东西（即文件中没有export关键字）的文件。**所以，不希望被tree-shaking的文件，请在`sideEffects`中配置与之匹配的正则表达式（如下，在package.json中添加）。**

```json
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "*.less"
  ],
}
```

- **NODE_ENV：** 由于项目中用到了Node的环境变量，所以打包时需通过`NODE_ENV`传入环境变量。

  ```json
  npm i -D  cross-env
  ```

  ```json
  {
     "dev": "cross-env NODE_ENV=development webpack --config  ./config/webpack.config.dev.js --progress",
     "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.prod.js --progress"
  }
  ```

- **polyfill** 兼容

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```





## 用户体验优化

### 模块懒加载

如果不进行`模块懒加载`的话，最后整个项目代码都会被打包到一个js文件里，单个js文件体积非常大，那么当用户网页请求的时候，首屏加载时间会比较长，使用`模块懒加载`之后，大js文件会分成多个小js文件，网页加载时会按需加载，大大提升首屏加载速度

```vue
// src/router/index.js

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    // 懒加载
    component: () => import('../views/home/home.vue'),
  },
]
```



### Gzip

开启Gzip后，大大提高用户的页面加载速度，因为gzip的体积比原文件小很多，当然需要后端的配合，使用`compression-webpack-plugin`

```
npm i compression-webpack-plugin -D
```

```js
// webpack.config.prod.js

const CompressionPlugin = require('compression-webpack-plugin')

  plugins: [
    // gzip
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ]
```



### 小图片转common64

对于一些小图片，可以转common64，这样可以减少用户的http网络请求次数，提高用户的体验。`webpack5`中`url-loader`已被废弃，改用`asset-module`

```js
// webpack.config.common.js

{
   test: /\.(png|jpe?g|gif|svg|webp)$/,
   type: 'asset',
   parser: {
     // 转common64的条件
     dataUrlCondition: {
        maxSize: 25 * 1024, // 25kb
     }
   },
   generator: {
     // 打包到 image 文件下
    filename: 'images/[contenthash][ext][query]',
   },
},
```

### 合理配置hash

我们要保证，改过的文件需要更新hash值，而没改过的文件依然保持原本的hash值，这样才能保证在上线后，浏览器访问时没有改变的文件会命中缓存，从而达到性能优化的目的

```js
// webpack.common.js

  output: {
    path: path.resolve(__dirname, '../dist'),
    // 给js文件加上 contenthash
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
```

