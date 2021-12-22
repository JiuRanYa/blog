---
id: react-performance-optimization
title: React性能优化的常用方法
---

本篇博客记录常用的React性能优化首都按

## 1. React Function Component性能优化方案

React重复渲染根源: diff 算法的单端复用查找， 组件`更新颗粒度`是`父组件以及父组件下所有子组件`为单位的，所以在
父组件state状态更新时，子组件state没有更改却被重新渲染，造成性能浪费

如果对VNode的渲染方案和React diff不熟悉的同学可以移步[渲染器本质, 从VNode看diff](http://hcysun.me/vue-design/zh/renderer-diff.html)

以下仅为`性能优化`手段，不要将他作为阻止渲染的手段

### 1.1 memo

main code

```typescript jsx

function Home(props) {
  console.log("component home render");
  return <div>home-count: {props.count}</div>;
}

export default function App() {
  const [count, setCount] = useState(0);

  const handleAddClick = () => {
    console.log("add");
    setCount((preCount) => preCount + 1);
  };

  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={handleAddClick}>增加1</button>
      <Home count={1} />
    </div>
  );
}


```

此时如果点击增加1修改了state, 那么Home组件会重新渲染

我们可以使用memo将Home组件的props记录下来，如果没改变就不重新渲染

```typescript jsx

function Home(props) {
  console.log("component home render");
  return <div>home-count: {props.count}</div>;
}

const MemoHome = memo(Home);

```

本质上就是一个`HOC`, 装饰器模式

原理: 闭包，容易理解

此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。

### 1.2. useCallback 和 useMemo

`useCallback`用于保存`函数`, `useMemo`一般用于保存函数体的`执行结果`

源码在实现上大同小异, 一个存`函数`一个存`结果`

当我们在写`utils`工具函数,导出任意一个函数的时候，你都应该去考虑将他用useCallback包裹来进行性能优化


### 1.3 扩展阅读
官方提到这么一个场景，当我们的`useCallback`依赖了一个频繁更新的`state`值

这时候只要`state`改变， `useCallback`保存的函数也会执行

```typescript jsx
import React, { useCallback, useEffect, useState } from "react";

export const UseCallbackT = () => {

  // useCallback deps
  const [count, setCount] = useState(0);

  const useCallbackExpensiveCaculation = useCallback(() => {
    console.log("useCallback count changed" + count);
  }, [count]);

  return (
    <div>
      <div>
        <div>result: {count}</div>
        <button onClick={() => setCount((preC) => preC + 1)}>更改count</button>
        <button onClick={() => expensiveCaculation(11, 22)}>
          expensiveCaculation
        </button>
      </div>
    </div>
  );
};


```

当更改`state`的时候， `useCallback`保存的函数体同样执行了, `useCallback count changed1 `

可以使用`useRef`进行优化













# 参考文献

- [渲染器本质, 从VNode看React和Vue的diff算法](http://hcysun.me/vue-design/zh/renderer-diff.html)


