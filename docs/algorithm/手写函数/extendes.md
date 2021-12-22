---
id: extends
title: JS继承实现
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: JS继承实现
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 7.手动实现ES5的继承
```js
function People() {
    this.type = 'prople'
  }

People.prototype.eat = function () {
    console.log('吃东西啦');
}

function Man(name) {
    this.name = name;
    this.color = 'black';
}
```

### No.1原型继承
```js
Man.prototype = new People();
let a = new Man()
console.log(a.__proto__)
```

### No.2构造函数继承
```js
function Man(name){
    People.call(this)
}
```

### No.3组合继承
```js
function Man(name){
    People.call(this)
}
Man.prototype = People.prototype
```

### No.4寄生组合继承
```js
function Man(name){
    People.call(this)
}
Man.prototype = Object.create(People.prototype, {
    constructor: {
        value: Man
    }
})
```