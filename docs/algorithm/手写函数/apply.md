---
id: apply
title: 模拟apply
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 模拟apply
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---


## 2.模拟apply
```js
Function.prototype.myapply = function(context = window, args){
    if(this == Function.prototype){
        return undefined;
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    if (Array.isArray(args)) {
        result = context[fn](...args);
    }else {
        result = context[fn]();
    }
    delete context[fn]
    return result
}

```