---
id: call
title: 模拟call
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 模拟call
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---




## 1.模拟call
```js

Function.prototype.mycall = function(context = window, ...args){
    if(this == Function.prototype){
        return undefined;
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn]
    return result
}
```