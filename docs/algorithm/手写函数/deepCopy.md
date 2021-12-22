---
id: deepCopy
title: deepCopy
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: deepCopy
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 1.手写深克隆
```js
function copy(data){
    let obj = data instanceof Array ? [] : {}
    for (const [k,v] of Object.entries(data)) {
        obj[k] = typeof v == "object" ? copy(v) : v;
    }
    return obj
}
```