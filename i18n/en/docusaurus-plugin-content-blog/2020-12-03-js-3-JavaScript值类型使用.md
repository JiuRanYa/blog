---
slug: Javascript教程第三章：JavaScript值类型使用
title: Javascript教程第三章：JavaScript值类型使用
author: Gao Wei
author_title: Docusaurus Core Team
author_url: https://github.com/wgao19
tags: [Javascript,前端]
---

Javascript教程第三章：JavaScript值类型使用
<!--truncate-->





一.JavaScript值类型使用
=============================

## 1.章节介绍与类型判断
typeof

## 2.字符串转义与模板字面量使用
```
let hd = new String("houdunren.com")
let hd = 'houdunren.com'

let site = "houdunren.com"
console.log(`网站是${site}`)
```
\用于引号转义

模板字面量在使用的时候不能用单引号，需要使用 ``  
在里面可以使用变量或者函数等表达式，JSX

## 3.神奇的标签模板实例操作
```js
let site = "houdunren.com"
let name = "后盾人"
console.log(tag`网站是${site}`)

function tag(strings, ...vars){
    console.log(strings)
}

//此时输出为[ '网站是', '' ]

```
在字面量前定义标签，标签函数中第一个为字符串，第二个参数为变量

```js
let lessons = [
    {title: "H5实战", author: "tsy"},
    {title: "H4实战tsy", author: "tsy"},
    {title: "H3实战", author: "tsy"},
]

function template(){
    return `<ul>
        ${lessons.map(item => links`
            <li>作者是：${item.author},课程：${item.title}</li>
            `)} 
    </ul>`
}

function links(strs,...args){
    return strs.map((item,index) => {
        return item + (args[index] ? args[index].replace('tsy',`<a href="www.hao123.com">tsy</a>`): '')
    }).join('')
}
document.body.innerHTML += template();

```

我们先使用模板定义三个li，将lessons中的数据进行展示，后面加上links标签来将数据中包含tsy的字段更改为含有超链接的tsy

## 4.字符串基本函数使用
```js
let name = " houdunren.com  "
console.log(name.length)
console.log(name.toUpperCase())
console.log(name.toLowerCase())
console.log(name.trim().length)
console.log(name.charAt(12))
```

## 5.字符串的截取操作
```js
let name = "houdunren.com"

console.log(name.slice(0,5))   
console.log(name.slice(-3))
console.log(name.substr(-3)) 
console.log(name.substr(0,5))

console.log(name.substring(-3))     //无效默认为从0开始截取
console.log(name.substring(0,5))

```

slice(),俩个参数，开始位置和截取位置，负数表示从后截取  
substr()俩个参数，开始位置和要截取的个数  
substring，俩个参数，开始位置和截取位置，负数无效，默认为0

## 6.字符串的检索操作
(1) indexof()
```js
const hd= "houdunren.com";
console.log(hd.indexof("o"))；

indexof俩个参数，要查找的字符和开始寻找的位置  
找不到的时候返回-1
```
(2) includes()
```js
const hd= "houdunren.com";
console.log(hd.includes("o",12))

includes返回的是布尔值，true or false
```
(3)lastindexof()
```js
从第九位往前查找
const hd = "houdunren.com";
console.log(hd.lastindexof("o",9))

```
(4)startsWith()
```js
const hd = "houdunren.com";
console.log(hd.startsWith("h"));
```

## 7.字符串替换操作
str.replace("需要更换的字符串","更换后的字符串")

## 8.电话号码模糊处理

重复输出某些字符串 : str.repeat("*",3)

```js
function phone(phoneNumber, len = 8){
    return phoneNumber.toString().slice(0, len * -1) + "*" + "*".repeat(len);
}
console.log(phone(13208041555))

输出：132********
```

## 9.类型转换使用技巧
使用类型的构造函数或者方法

(1) 字符串转换为数字
```js
const string = "99";
console.log(typeof string);

// 1.隐式转换，让字符串参与数学运算(纯数字时候使用，不是纯数字返回NaN)

console.log(string*1 + 97)

// 2.使用Number()构造函数(纯数字)

console.log(Number(string) + 97)

// 3.parseInt() 该方法如果以字符串开头，则不会返回数字，返回NaN

console.log(parseInt("99houdunren.com"))

```

(2) 字符串转换为数组：

```js
//数组转换为字符串
const array = ["houdunren.com","hdcms"]
console.log(array.join(","))

//字符串转换为数组
const str = 'hourunden.com';
用于把一个字符串分割成数组

split() 参数是    需要按照什么进行拆分
console.log(str.split(""))

需要有length属性，没用lenth属性的对象不适用：
第二个参数是需要对str进行处理的函数
console.log(Array.from(str,function(item){}))

```

## 10.Number声明方式与基本函数

(1) isInteger(number)  
判断是否为整数类型

(2) number.toFixed(2)  
保存俩位小数


## 11.数值类型转换技巧与NaN
NaN：当我们希望是数值但结果不是数值的时候提示，NaN是一个特殊的数值类型  
NaN不能和自身进行比较

## 12.Math数学计算

(1) 取得最大最小值
```js
Math.min(1,2,3,4)

const array = [58,12,48,98,75]
Math.max.apply(null,array)
```

(2) 向上取整和向下取整
```js
English : 天花板 ceiling

Math.ceil(5.2) 向上取整

Math.floor(5.9) 向下取整
```

(3) 舍入函数
Math.Fixed(2) 保留俩位小数

(4) 随机数
Math.random()

## 13.Math.random随机点名
```js
Math.random()   0-1 含0不含1
Math.floor()  

算法：
Math.floor(Math.random() * (Max + 1))
```


## 14.日期时间戳的使用与计算脚本使用事件

```js
const date = new Date();
console.log(typeof data)        //undefined

const hd = Date();              //string
console.log(typeof hd)

const hds = Date.now();         //1584691416559 时间戳
console.log(hds)

console.time("第一个标志位名称")
console.timeEnd("第一个标志位名称") //返回毫秒数
```


## 15.ISO与 TimeStamp格式转换
(1) 时间转换为时间戳
```js
const date = new Date("1999-2-12 08:22:12")
console.log(date * 1)
console.log(Number(date))
console.log(date.valueof(date))
console.log(date.getTime())
```

(2) 时间戳转换为标准时间
```js
const timestamp = date.valueof()
const ISO = new Date(date)
```

## 16.格式化时间
```js
const date = new Date();

function dateFormat(date,format = "YYYY-MM-DD HH:mm:ss"){
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth()+1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()
    };
    for(const key in config){
        format = format.replace(key,config[key]);
    }
    return format;
}

console.log(dateFormat(date, format = "YYYY年MM月DD日"))

```


## 17.优秀的日期处理库Moment.JS
```js
npm i moment -g

var moment = require('moment');
console.log(moment().format("YYYY年MM月DD日 HH:mm:ss"))
```