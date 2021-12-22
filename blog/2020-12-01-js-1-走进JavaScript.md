---
slug: Javascript教程第一章：走进JavaScript
title: Javascript教程第一章：走进JavaScript
author: Gao Wei
author_title: Docusaurus Core Team
author_url: https://github.com/wgao19
tags: [Javascript,前端]
---

Javascript教程第一章：走进Javascript

本章我会带大家走进Javascrpt，从最初的变量声明方式到ES6现代化的变量声明方式，并了解不同声明方式的特性



<!--truncate-->

一.第一章：走进JavaScript

## 1.变量提升
定义："函数"及"变量的声明"都将被提升到函数的最顶部（函数，变量，上升到函数的顶部）。
```
console.log(web)
var web = "hundunren.com"
```

隐式变量不会进行提升  
***

使用var定义变量的时候变量声明会先提升函数顶部，赋值在下，所以输出undefined

用let声明变量的时候不会出现变量提升，会存在暂时性死区TDZ  
***
TDZ:在代码块内，使用 let 命令声明变量之前，该变量都是不可用的  
这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）
***
```
let web = "hdcms.com"
function func(){
    console.log(web);
    let web = "houdunren.com";
}
```

以上代码也会保存，以为在func函数区域里出现了TDZ

## 2.var-let-const 共同点
const不能够修改，但是是在同一个作用域下不能修改，  
关注点：内存地址

## 3.标量与引用类型的传值与传址特征
```
传值
let a = 1;
let b = a;

传址
let e = {}
let f = e;
```
牵扯到深拷贝和浅拷贝

## 4.null与undefined

## 5.use strict 严格模式高质量代码守卫
```
'use strict'
web = "houdunren.com"

function run(){
    web = "hdsc.com"
}

run()
```
局部污染全局，这种情况在严格模式下不成立  

严格模式的作用域是向下约束，不会影响到上层作用域 