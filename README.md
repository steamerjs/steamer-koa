# Koa Starter Kit

关于更多安装详情，请参考：
[steamer-plugin-kit](https://github.com/SteamerTeam/steamer-plugin-kit)

## 简介
此分支是koa快速启动分支

## 配置介绍
目前主要的构建配置都放在tools文件夹下，它们的作用分别如下：
* `config.js`           自身的一些配置，例如域名、服务器端口等
* `config-template`     `config.js`的模板，用于steamer安装时候进行替换的模板

配合`package.json`的`scripts`命令，可以方便用简单命令启动开发及生产环境。

## 安装starter kit

```javascript
npm i -g steamerjs

npm i -g steamer-koa

// install starter kit, koa below is short for steamer-koa
steamer kit --install koa --path str-koa 
// or
steamer kit -i koa -p str-koa

// update starter kit
cd str-koa
 
steamer kit --update
// or 
steamer kit -u

```

## 安装mongoDB
```javascript
// 安装mongoDB
网上有不少教程

// 启动mongodb
mongod
```

## 初始化数据
```javascript
npm run init
```

## 启动服务器
```javascript
npm start
```

## 用代理进行访问