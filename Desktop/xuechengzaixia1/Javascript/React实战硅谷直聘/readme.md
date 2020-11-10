

  - 1. npm i create-react-app -g
  - 2. 命令 create-react-app 文件夹名
  - 3. 启动 npm start

   ## 使用npm run build
    下载serve插件
    serve build运行生产环境的文件夹

   ## 引入antd-mobile
    下载
    npm i antd-mobile --save

   ## 实现组件按需打包  自动打包样式
    npm i --save-dev babel-plugin-import react-app-rewired
    需要定义 config-overrides.js文件
    之后修改package.json中的命令为以下
    "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "client": "serve build"
    },

    引入路由
    npm i react-router-dom --save

 ## 引入redux
    - 下载相关依赖包
    npm i --save redux@3.7.2 react-redux redux-thunk
    npm i --save-dev redux-devtools-extension
    