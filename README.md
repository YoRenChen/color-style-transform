# colorStyleTransform

明暗风色彩转换搭建

## 前言

构建色系与 UI 统一性，就需要 UI 组件和 UI 颜色体系达到一致的系统

- 基于对 AntDesign 框架颜色处理源码探究。
- 基于 AntDesign-Vue(v1.6x)

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

可以直接执行`npm run color`进行生成样式文件

## 博文说明地址

[前端明暗风颜色切换](https://github.com/YoRenChen/Blog/issues/3)

## 实现效果

(效果图有点大，wait a moment)

![效果图](https://github.com/YoRenChen/color-style-transform/blob/master/docs/480_low.gif)
