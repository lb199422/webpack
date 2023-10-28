## postcss 处理css 

  npm i postcss-loader autoprefixer -D
  css 自动前缀


## 查看打包后的样式 

  serve -s disk,


## 配置babel 

  npm i babel-loader @babel/core @babel/preset-env core-js -D

  babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5（上面已经安装过）
  @babel/corer: babel 编译的核心包
  @babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
  core-js: 使用低版本js语法模拟高版本的库,也就是垫片

##  复制public文件夹
  一般public文件夹都会放一些静态资源,可以直接根据绝对路径引入,比如图片,css,js文件等,不需要webpack进行解析,只需要打包的时候把public下内容复制到构建出口文件夹中,可以借助copy-webpack-plugin插件,安装依赖

## 处理图片
  对于图片文件,webpack4使用file-loader和url-loader来处理的,但webpack5不使用这两个loader了,而是采用自带的asset-module来处理


## 构建耗时分析
  speed-measure-webpack-plugin

## 开启持久化存储缓存

  在webpack5之前做缓存是使用babel-loader缓存解决js的解析结果,cache-loader缓存css等资源的解析结果,还有模块缓存插件hard-source-webpack-plugin,配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,如果一致则采用上一次的缓存,可以极大地节省时间。
  webpack5 较于 webpack4,新增了持久化缓存、改进缓存算法等优化,通过配置 webpack 持久化缓存,来缓存生成的 webpack 模块和 chunk,改善下一次打包的构建速度,可提速 90% 左右,配置也简单，修改build/webpack.base.js

## 开启多线程loader

  webpack的loader默认在单线程执行,现代电脑一般都有多核cpu,可以借助多核cpu开启多线程loader解析,可以极大地提升loader解析的速度,thread-loader就是用来开启多进程解析loader
  由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader(下面会讲),所以这里只配置了多进程解析js,开启多线程也是需要启动时间,大约500ms左右,所以适合规模比较大的项目

## 精确使用loader

  loader在webpack构建过程中使用的位置是在webpack构建模块依赖关系引入新文件时，会根据文件后缀来倒序遍历rules数组，如果文件后缀和test正则匹配到了，就会使用该rule中配置的loader依次对文件源代码进行处理，最终拿到处理后的sourceCode结果，可以通过避免使用无用的loader解析来提升构建速度，比如使用less-loader解析css文件。
  可以拆分上面配置的less和css, 避免让less-loader再去解析css文件


## 缩小模块搜索范围

  node里面模块有三种
  node核心模块
  node_modules模块
  自定义文件模块

  使用require和import引入模块时如果有准确的相对或者绝对路径,就会去按路径查询,如果引入的模块没有路径,会优先查询node核心模块,如果没有找到会去当前目录下node_modules中寻找,如果没有找到会查从父级文件夹查找node_modules,一直查到系统node全局模块。
  这样会有两个问题,一个是当前项目没有安装某个依赖,但是上一级目录下node_modules或者全局模块有安装,就也会引入成功,但是部署到服务器时可能就会找不到造成报错,另一个问题就是一级一级查询比较消耗时间。可以告诉webpack搜索目录范围,来规避这两个问题。

##  devtool配置

  开发过程中或者打包后的代码都是webpack处理后的代码,如果进行调试肯定希望看到源代码,而不是编译后的代码, source map就是用来做源码映射的,不同的映射模式会明显影响到构建和重新构建的速度, devtool选项就是webpack提供的选择源码映射方式的配置。
  devtool的命名规则为 ^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$

| **关键字** | **描述**                                                 |
| ---------- | -------------------------------------------------------- |
| inline     | 代码内通过 dataUrl 形式引入 SourceMap                    |
| hidden     | 生成 SourceMap 文件,但不使用                             |
| eval       | `eval(...)` 形式执行代码,通过 dataUrl 形式引入 SourceMap |
| nosources  | 不生成 SourceMap                                         |
| cheap      | 只需要定位到行信息,不需要列信息                          |
| module     | 展示源代码中的错误位置                                   |

  关键字描述inline代码内通过 dataUrl 形式引入 SourceMaphidden生成 SourceMap 文件,但不使用evaleval(...) 形式执行代码,通过 dataUrl 形式引入 SourceMapnosources不生成 SourceMapcheap只需要定位到行信息,不需要列信息module展示源代码中的错误位置
  开发环境推荐：eval-cheap-module-source-map

  本地开发首次打包慢点没关系,因为 eval 缓存的原因,  热更新会很快
  开发中,我们每行代码不会写的太长,只需要定位到行就行,所以加上 cheap
  我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module



## 抽取css样式文件

  在开发环境我们希望**css**嵌入在**style**标签里面,方便样式热替换,但打包时我们希望把**css**单独抽离出来,方便配置缓存策略。而插件[mini-css-extract-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fmini-css-extract-plugin)就是来帮我们做这件事的,安装依赖：

```js
npm i mini-css-extract-plugin -D
npm i css-minimizer-webpack-plugin -D  // 压缩css 
```

## 压缩js文件

```js
npm i terser-webpack-plugin -D
optimization: {
    // 压缩css
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除console.log
          },
        },
      }),
    ],
  },
```

## 合理配置打包文件hash

  项目维护的时候,一般只会修改一部分代码,可以合理配置文件缓存,来提升前端加载页面速度和减少服务器压力,而hash就是浏览器缓存策略很重要的一部分。webpack打包的hash分三种：

  hash：跟整个项目的构建相关,只要项目里有文件更改,整个项目构建的hash值都会更改,并且全部文件都共用相同的hash值
  chunkhash：不同的入口文件进行依赖文件解析、构建对应的chunk,生成对应的哈希值,文件本身修改或者依赖文件修改,chunkhash值会变化
  contenthash：每个文件自己单独的 hash 值,文件的改动只会影响自身的 hash 值

  hash是在输出文件时配置的,格式是filename: "[name].[chunkhash:8][ext]",[xx] 格式是webpack提供的占位符, :8是生成hash的长度

| **占位符**  | **解释**                  |
| ----------- | ------------------------- |
| ext         | 文件后缀名                |
| name        | 文件名                    |
| path        | 文件相对路径              |
| folder      | 文件所在文件夹            |
| hash        | 每次构建生成的唯一hash 值 |
| chunkhash   | 根据chunk生成hash 值      |
| contenthash | 根据文件内容生成hash 值   |

```js

  filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]

```

## 代码分割第三方包和公共模块



一般第三方包的代码变化频率比较小,可以单独把**node_modules**中的代码单独打包, 当第三包代码没变化时,对应**chunkhash**值也不会变化,可以有效利用浏览器缓存，还有公共的模块也可以提取出来,避免重复打包加大代码整体体积, **webpack**提供了代码分隔功能, 需要我们手动在优化项[optimization](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F)中手动配置下代码分隔[splitChunks](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationsplitchunks)规则。

```js
module.exports = {
  // ...
  optimization: {
    // ...
    splitChunks: { // 分隔代码
      cacheGroups: {
        vendors: { // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        }
      }
    }
  }
}

```

测试一下,此时**verdors.js**的**chunkhash**是**6aeb3c4c.js**,**main.js**文件的chunkhash是**f70933df**,改动一下**App.vue**,再次打包,可以看到下图**main.js**的chunkhash值变化了,但是**vendors.js**的chunkhash还是原先的,这样发版后,浏览器就可以继续使用缓存中的**verdors.ec725ef1.js**,只需要重新请求**main.js**就可以了。

## tree-shaking清理未引用js

## tree-shaking清理未使用css

## 打包时生成gzip文件
