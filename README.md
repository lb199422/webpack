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