---
slug: Javascript教程第六章：Set 和 WeakSet类型
title: Javascript教程第六章：Set 和 WeakSet类型
author: Gao Wei
author_title: Docusaurus Core Team
author_url: https://github.com/wgao19
tags: [Javascript,前端]
---

Javascript教程第六章：Set 和 WeakSet类型

<!--truncate-->



一.Set 和 WeakSet类型
============================

## 1.Set类型


1.增加:
```js
set.add()
```
2.删除:
```js
set.delete()
set.clear()
```
3.改:

4.查:
```js
set.has()
```
5.遍历

```js
set.size()
set.values()
set.keys()
for of 和 forEach(value,key,set)
```



### 1.Set:集合不能放重复元素

在Object类型中，属性名都会转换成字符串类型，而Set是严格类型约束，1是1 ,"1"是"1"


```
let set = new Set([1,2,3])
set.add(5)

let set = new Set("hdms");
console.log(set);           
//输出如下：Set { 'h', 'd', 'm', 's' }

let set1 = new Set(["hdms","houdunren"])
console.log(set1.size);


```

## 2.遍历Set类型的方式
```
let myset = new Set(["hdms","houdunren.com"])
console.log(myset.values());            //返回可迭代对象

遍历方式：

(1)
set.forEach(function(value,key,set))
(2)
for(const iterator of set)
```

## 3.使用Set处理网站关键词
```js
let input = document.getElementsByTagName("input")[0];
let obj = {
    data: new Set(),
    keyWord(keyword){
        this.data.add(keyword)
    },
    show(){
        let ul = document.querySelector("ul");
        ul.innerHTML = '';
        this.data.forEach(function(item){
            ul.innerHTML += `<li>${item}</li>`;
        })
    }
}
input.addEventListener("blur",function(){
    obj.keyWord(this.value);
    obj.show()
})

```


## 4.Set实现并集交集差集的算法
```
let a = new Set([1,2,3,4])
let b = new Set([6,5,3,4])
//并集
let c = new Set([...a,...b])

//差集
console.log(
    new Set([...a].filter(function(item){
        return !b.has(item);
    }))
);
```

## 5.WeakSet语法介绍
WeakSet(Object)必须为引用类型

操纵DOM元素
```js
let nodes = new WeakSet()
document.querySelectorAll("div").forEach(functiom(item){
    nodes.add(item)
})

```

## 6.引用类型的垃圾回收机制
同一个对象引用一次，内存中该对象的引用次数加一，当引用次数为零时，则变为垃圾

## 7.WeakSet弱引用类型
```
let hd = {name:"houdunren"}
let edu = hd;

此时我们引用了俩次该内存地址，引用次数为2

let set = new WeakSet();
set.add(hd)

再将该内存地址的数据加入WeakSet类型中，引用次数不会增加，我们将这种方式成为弱引用类型,Set的迭代方法等等都无法使用

console.log(set);

如果此时我们将hd和edu清空,那么该内存地址的数据将会被当作垃圾处理
hd = null;
edu = null;

而此时WeakSet中还是会认为有数据
```

## 8.todo列表中使用 WeakSet

使用WeakSet保存DOM中的NodeList

```
class todo {
    constructor(){
        this.items = document.querySelectorAll('ul>li')
        // console.log(this.items);
        let list = new WeakSet()
        this.items.forEach(item => list.add(item))
    }
    addEvent(){
        this.items.forEach(item => {
            let a = item.querySelector('a');
            a.addEventListener('click',function(e){
                const parentNode = e.target.parentElement;
                parentNode.classList.add("remove")
            })
        })
    }
    run(){
        this.addEvent();
    }

}
new todo().run(); 

```