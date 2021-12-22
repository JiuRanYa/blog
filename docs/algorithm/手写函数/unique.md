---
id: unique
title: 数组去重方法
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 数组去重方法
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 6.手写数组去重
```js
const unique = (array)=>{
    let container = {}
    return array.filter((item)=>{
        return container.hasOwnProperty(item) ? false : (container[item] = true);
    })
}

```