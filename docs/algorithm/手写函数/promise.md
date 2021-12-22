---
id: promise
title: 手动封装promise
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 手动封装promise
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 基础版本
### 代码
```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'
        this.value = null
        this.reason = null
    
        const resolve = (value) => {
            this.value = value
            this.state = 'FULFILLED'
        }

        const reject = (reason) => {
            this.reason = reason
            this.state = 'REJECTED'
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }
}

```

## then方法
### 代码
```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'
        this.value = null
        this.reason = null
    
        const resolve = (value) => {
            this.value = value
            this.state = 'FULFILLED'
        }

        const reject = (reason) => {
            this.reason = reason
            this.state = 'REJECTED'
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        switch(this.state){
            case 'FULFILLED':
                onFulfilled(this.value)
                break
            case 'REJECTED':
                onRejected(this.reason)
                break
        }
    }
}
```

### 增加订阅者模式
可以看出如果之前的Promise没有改变state值，一直为PENDING时,then方法不会执行，我们可以采用订阅者模式监听state值的改变，如果改变，那么发布执行函数

```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'  //状态值
        this.value = null   //成功的返回值
        this.reason = null  //失败的返回值
        this.onFulfilledCallbacks = []  //成功的执行函数
        this.onRejectedCallbacks = []   //失败的执行函数
    
        const resolve = (value) => {
            this.value = value
            this.state = 'FULFILLED'
            this.onFulfilledCallbacks.forEach(fn => fn())   //状态改变，发布执行函数
        }

        const reject = (reason) => {
            this.reason = reason
            this.state = 'REJECTED'
            this.onRejectedCallbacks.forEach(fn => fn())    //状态改变，发布执行函数
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        switch(this.state){
            case 'FULFILLED':
                onFulfilled(this.value)
                break
            case 'REJECTED':
                onRejected(this.reason)
                break
            case 'PENDING':
                this.onFulfilledCallbacks.push(()=>{
                    onFulfilled(this.value)
                })
                this.onRejectedCallbacks.push(()=>{
                    onFulfilled(this.value)
                })
                break
        }
    }
}
```

## then异步执行
### 代码
> 我们不难发现，上面的代码中，then是同步代码，不符合promise.then的要求，这里我们使用定时器来模拟异步任务

```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'  //状态值
        this.value = null   //成功的返回值
        this.reason = null  //失败的返回值
        this.onFulfilledCallbacks = []  //成功的执行函数
        this.onRejectedCallbacks = []   //失败的执行函数
    
        const resolve = (value) => {
            this.value = value
            this.state = 'FULFILLED'
            this.onFulfilledCallbacks.forEach(fn => fn())   //状态改变，发布执行函数
        }

        const reject = (reason) => {
            this.reason = reason
            this.state = 'REJECTED'
            this.onRejectedCallbacks.forEach(fn => fn())    //状态改变，发布执行函数
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        switch(this.state){
            case 'FULFILLED':
                setTimeout(() => {
                    onFulfilled(this.value)
                    
                }, 0);
                break
            case 'REJECTED':
                setTimeout(() => {
                    onRejected(this.reason)
                }, 0);
                break
            case 'PENDING':
                setTimeout(() => {
                    this.onFulfilledCallbacks.push(()=>{
                        onFulfilled(this.value)
                    })
                    this.onRejectedCallbacks.push(()=>{
                        onFulfilled(this.value)
                    })
                }, 0);
                break
        }
    }
}
```
### 测试
我们对上面的代码进行测试:
```js
console.log(0);

let promise = new MyPromise((resolve, reject) => {
    resolve(2)
    console.log("1");
}).then(
    value => {
        console.log(value);
    }
)
console.log(4);             //0 1 4 2
```

## then方法链式调用
### 传递普通值
考虑如下问题：
* 如何保证then方法可以链式调用?

> 如果then方法返回的是普通纸，那我们可以直接使用x记录下来并传入resolve

```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'  //状态值
        this.value = null   //成功的返回值
        this.reason = null  //失败的返回值
        this.onFulfilledCallbacks = []  //成功的执行函数
        this.onRejectedCallbacks = []   //失败的执行函数
    
        const resolve = (value) => {
            if(this.state === 'PENDING'){
                this.value = value
                this.state = 'FULFILLED'
                this.onFulfilledCallbacks.forEach(fn => fn())   //状态改变，发布执行函数
            }
        }

        const reject = (reason) => {
            if(this.state === 'PENDING'){
                this.reason = reason
                this.state = 'REJECTED'
                this.onRejectedCallbacks.forEach(fn => fn())    //状态改变，发布执行函数
            }
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        let promise2 = new MyPromise((resolve, reject) => {
            switch(this.state){
                case 'FULFILLED':
                    setTimeout(() => {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    }, 0);
                    break
                case 'REJECTED':
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        resolve(x)
                    }, 0);
                    break
                case 'PENDING':
                    this.onFulfilledCallbacks.push(()=>{
                        let x = onFulfilled(this.value)
                        resolve(x)
                    })
                    this.onRejectedCallbacks.push(()=>{
                        let x = onRejected(this.reason)
                        resolve(x)
                    })
                    break
            }
        })

        return promise2
    }
}
```

### 测试
我们对上面的代码进行测试
```js
console.log(0);

let promise = new MyPromise((resolve, reject) => {
    resolve(2)
    console.log("1");
}).then(
    value => {
        console.log(value);
        let result = 'aaa'
        return result
    }
).then(
    value => {
        console.log(value);
    }
)                                                       // 0 1 2 aaa
```

### 传递Promise
> 上面的代码默认then返回的是一个普通的值，但如果要让then返回一个promise，那我们就要写一个辅助函数来进行处理

```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'  //状态值
        this.value = null   //成功的返回值
        this.reason = null  //失败的返回值
        this.onFulfilledCallbacks = []  //成功的执行函数
        this.onRejectedCallbacks = []   //失败的执行函数
    
        const resolve = (value) => {
            if(this.state === 'PENDING'){
                this.value = value
                this.state = 'FULFILLED'
                this.onFulfilledCallbacks.forEach(fn => fn())   //状态改变，发布执行函数
            }
        }

        const reject = (reason) => {
            if(this.state === 'PENDING'){
                this.reason = reason
                this.state = 'REJECTED'
                this.onRejectedCallbacks.forEach(fn => fn())    //状态改变，发布执行函数
            }
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        let x = null
        let promise2 = new MyPromise((resolve, reject) => {
            switch(this.state){
                case 'FULFILLED':
                    setTimeout(() => {
                        x = onFulfilled(this.value)
                        //处理then的返回值,then的返回值类型:对象,函数,普通值
                        reslovePromise(promise2, x, resolve, reject)
                    }, 0);
                    break
                case 'REJECTED':
                    setTimeout(() => {
                        x = onRejected(this.reason)
                        reslovePromise(promise2, x, resolve, reject)
                    }, 0);
                    break
                //防止Promise是异步代码块
                case 'PENDING':
                    this.onFulfilledCallbacks.push(()=>{
                        x = onFulfilled(this.value)
                        reslovePromise(promise2, x, resolve, reject)
                    })
                    this.onRejectedCallbacks.push(()=>{
                        x = onRejected(this.reason)
                        reslovePromise(promise2, x, resolve, reject)
                    })
                    break
            }
        })

        return promise2
    }
}
```
### 核心处理函数resolvePromise
```js
const reslovePromise = (promise2, x, resolve, reject) => {
    if(promise2 === x){
        let error = new TypeError('Chaining cycle detected for promise #<promise>')
        return reject(error)
    }
    if(typeof x === 'object' && x!=null || typeof x === 'function'){
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, value =>{
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            }else{
                //x不是一个函数,是一个对象
                resolve(x)
            }
        }catch(err){
            reject(err)
        }
    }else{
        //x不是函数和对象,是一个普通值
        resolve(x)
    }
}

```
### 测试
```js
console.log(0);

let promise = new MyPromise((resolve, reject) => {
    resolve(2)
    console.log("1");
}).then(
    value => {
        console.log(value);
        let result = 'aaa'
        return new MyPromise((resolve, reject) => {
            resolve('TTT')
        })
    }
).then(
    value => {
        console.log(value);
    }
)                                                               //0 1 2 ttt
```

## Promise方法的实现
### Promise.all()
```js
function MyPromiseAll (promises) {
  // 检测目标是不是iterator类型
  let isIterator = (target) => {
    return target && typeof target[Symbol.iterator] === 'function'
  }
  return new Promise((resolve, reject) => {
    // 保存结果的数组
    let result = []
    // 已经遍历的promise数量
    let count = 0
    // 缓存一次promises的长度,后面不用每次使用都查询
    let len = promises.length
    // 因为理论上promises应该为iterator,所以不能用length去判断
    if (!isIterator(promises)) {
      resolve(result)
    } else {
      // 遍历整个promises，注意应该使用for of 去操作iterator类型
      for (const promise of promises) {
        // 使用Promise.resolve将普通值类型封装为Promise类型(简便)
        Promise.resolve(promise).then(val => {
          result.push(val)
          count++
          // 当遍历结束后将结果resolve出去
          if (count === len) {
            resolve(result)
          }
        }, reason => {
          // 遇到reject后直接抛出第一个错误
          reject(reason)
        })
      }
    }
  })
}
```

## 基础版本完整代码
```js
class MyPromise{
    constructor(executor){
        this.state = 'PENDING'  //状态值
        this.value = null   //成功的返回值
        this.reason = null  //失败的返回值
        this.onFulfilledCallbacks = []  //成功的执行函数
        this.onRejectedCallbacks = []   //失败的执行函数
    
        const resolve = (value) => {
            if(this.state === 'PENDING'){
                this.value = value
                this.state = 'FULFILLED'
                this.onFulfilledCallbacks.forEach(fn => fn())   //状态改变，发布执行函数
            }
        }

        const reject = (reason) => {
            if(this.state === 'PENDING'){
                this.reason = reason
                this.state = 'REJECTED'
                this.onRejectedCallbacks.forEach(fn => fn())    //状态改变，发布执行函数
            }
        }

        try{
            executor(resolve, reject)
        }catch(err){
            reject(err)
        }
    }

    then(onFulfilled, onRejected){
        let x = null
        let promise2 = new MyPromise((resolve, reject) => {
            switch(this.state){
                case 'FULFILLED':
                    setTimeout(() => {
                        x = onFulfilled(this.value)
                        reslovePromise(promise2, x, resolve, reject)
                    }, 0);
                    break
                case 'REJECTED':
                    setTimeout(() => {
                        x = onRejected(this.reason)
                        reslovePromise(promise2, x, resolve, reject)
                    }, 0);
                    break
                case 'PENDING':
                    this.onFulfilledCallbacks.push(()=>{
                        x = onFulfilled(this.value)
                        reslovePromise(promise2, x, resolve, reject)
                    })
                    this.onRejectedCallbacks.push(()=>{
                        x = onRejected(this.reason)
                        reslovePromise(promise2, x, resolve, reject)
                    })
                    break
            }
        })

        return promise2
    }
}

const reslovePromise = (promise2, x, resolve, reject) => {
    if(promise2 === x){
        let error = new TypeError('Chaining cycle detected for promise #<promise>')
        return reject(error)
    }
    if(typeof x === 'object' && x!=null || typeof x === 'function'){
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, value =>{
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            }else{
                //x不是一个函数,是一个对象
                resolve(x)
            }
        }catch(err){
            reject(err)
        }
    }else{
        //x不是函数和对象,是一个普通值
        resolve(x)
    }
}
```

