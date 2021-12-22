---
id: instanceof
title: 手动实现一个instanceof
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 手动实现一个instanceof
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 1.手动实现一个instanceof
```js
function myinstanceof(target, origin){
    let proto = target.__proto__
    if(proto){
        if(proto === origin.prototype){
            return true
        }else{
            return myinstanceof(proto, origin)
        }
    }else{
        return false
    }
}
```