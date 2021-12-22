---
id: lazyload
title: 图片懒加载
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 图片懒加载
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 12.图片懒加载
```js

let imgs = document.getElementsByTagName("img");
let n = 0

lazyload()

//节流函数
function throttle(handleEvent,time){
    let timer
    return function(...args){
        if(timer){
            timer = setTimeout(() => {
                timer = null
                handleEvent.apply(this,args)
            }, time);
        }
    }
}
function lazyload(){
    let seeHight = window.innerHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for(let i = n; i < imgs.length; i++){
        if(imgs[i].offsetTop < seeHight + scrollTop){
            if(imgs[i].getAttribute('src') == 'loading.gif'){
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
            n = i + 1;
        }
    }
}

window.addEventListener('scroll',throttle())
```