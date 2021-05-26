# colorStyleTransform

前端明暗风颜色转换

## 实现效果

![效果图](https://github.com/YoRenChen/color-style-transform/blob/master/docs/480_low.gif)

## 前言

构建 WEB 网站主题色系与 UI 统一，UI 组件和 UI 颜色体系一致的系统 DEMO。

- 基于对 AntDesign 框架颜色处理源码探究，版本: ``AntDesign-Vue(v1.6x)``
- 基于``Less funciton`` + ``HSV``，函数式处理自定义颜色和使用HSV进行明暗度置换。

探讨方向：

1. AntDesign 颜色处理分析
2. 构建颜色与明暗风切换的系统

## 说明

技术栈：vuecli/ vue/ less

```(filePath)
├── public // 文件放置处
├── src
│   ├── App.vue
│   ├── assets
│   ├── color.js
│   ├── components
│   ├── global.less
│   ├── main.js // 入口
│   ├── styles // 样式存放
│   └── utils
├── vue.config.js
```
### 生成样式文件
```
npm run color
```
### 运行
`yarn install` or `npm i`
```
npm run serve
```

## 文档说明地址
该文档说明是在阅读 ``AntDesign`` 源码的时，把主题色风格转换模块抽取出来分析并对构建该 DEMO 的思路说明。详情请参考：

[前端明暗风颜色切换](https://github.com/YoRenChen/Blog/issues/3)
