---
id: assign
title: Object.assign
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 手动封装Object.assign()
keywords:
- JavaScript
- frontend
---


## Object.assign
```ts
  function assign(target: object, ...sources: any[]): object {
    if (!isObject(target)) {
      throw new TypeError('The target must be an Object not a function')
    }
    sources.forEach(source => {
      let descriptors = Object.keys(source).reduce((descriptor, key) => {
        descriptor[key] = Object.getOwnPropertyDescriptor(source, key)
        return descriptor
      }, {})
      // assign enumerable Symbols
      Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym)
        if (descriptor?.enumerable) {
          descriptors[sym] = descriptor
        }
      })
      // assign descriptors to target
      Object.defineProperties(target, descriptors)
    })
  
    return target
  }
```
