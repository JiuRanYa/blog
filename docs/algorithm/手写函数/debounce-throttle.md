---
id: debounce-throttle
title: 防抖和节流函数实现
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 防抖和节流函数实现
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 1.手写防抖
```js
function debounce(handleEvent, time, flag){
    let timeout = null;
    return function(...agrs){
        clearTimeout(timeout)
        if(flag && !timeout){
            handleEvent.apply(this, args)
        }
        timeout = setTimeout(()=>{
            handleEvent.apply(this, args)
        },time)
    }
}
```

## 2.手写节流
```js
function throttle(handleEvent, time){
    let timer = null;
    return function(...args){
        if(!timer){
            timer = setTimeout(() => {
                timer = null;
                handleEvent.apply(this, args)
            }, time);
        }
    }
}
```