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
