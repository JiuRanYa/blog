---
id: ajax
title: 手动实现一个Ajax
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 手动实现一个Ajax
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 1.手动实现一个Ajax
```js
function myAjax(config){
    let {
        url,
        method = 'get',
        data = {},
        async = true,
        success,
        fail
    } = config

    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function(){
        if(xml.readyState == 4){
            if((xml.status >= 200 && xml.status < 300) && xml.status == 304){
                const response = xml.responseText;
                success(response)
            }else{
                const error = xml.status
                fail(error)
            }
        }
    }
    xml.open(method, url, async)
    xml.send(data)
}
```

## 2.基于Promise封装一个Ajax
```js
function promiseAjax(config){
    let {
        url,
        method = 'get',
        data = {},
        async = true,
        success,
        fail
    } = config

    return new Promise((resolve, reject)=>{
        let xml = new XMLHttpRequest();

        xml.open(method, url, async)
        xml.send(data)
        xml.onreadystatechange = function() {
            if(xml.readyState == 4){
                if((xml.status >= 200 && xml.status < 300) && xml.status == 304){
                    const response = xml.responseText
                    resolve(response)
                }else{
                    const error = xml.status
                    reject(error)
                }
            }
        }
        xml.onerror = function(){
            reject(new TypeError("请求出错"))
        }
        xml.timeout = function(){
            reject(new TypeError("请求超时"))
        }

    })
}
```