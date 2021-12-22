---
id: lru
title: JS实现LRU算法
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: JS实现LRU算法
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 1.JS实现LRU算法
```js
class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        //如果没有,返回-1
        if(!this.cache.has(key)) return -1;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,value)
        return value
    }

    set(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }else{
            if(this.cache.size == this.capacity){
                const delKey = this.cache.keys().next().value;
                this.cache.delete(delKey)
            }
        }
        this.cache.set(key,value)
    }
}
```