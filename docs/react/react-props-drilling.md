---
id: react-props-drilling
title: React中的props-drilling问题
---

在React中我们经常会碰到`父组件`一层一层的去给`子组件`传递props的问题, 这种一层一层的将props

往下传递的现象, 叫做`props-drilling`, `drilling`是`下钻`的意思, 生动的体现的这一现象

这个时候, 我们可以利用一些技巧来解决这些问题, 我们来看一个常见的场景


## 一. prop drilling 问题

合理使用 Component Composition

我们 `authenticated-app` 使用状态提升定义了一个公共的 `prop`, 并把它层层传递给了子组件
  
### 1.1 props-drilling的缺点

- 缺点一: state definition is far away the place where the state is being used 高耦合
- 缺点二: 我们这里使用状态提升定义了一个公共的 prop, 并把它层层传递给了子组件，(下钻)

`Component Composition` 把公共的 `JSX.Element` 当作变量传递给了子组件

- 可以将 `state` 和子组件解耦合,子组件不再依赖父组件中传入的更改 `state` 的函数
- 无需在 `interface` 层层更改 `state` 定义

Component Composition 实际上也是一种状态提升的手段，并不是适合每个场景，因为这样可能会让父组件变得更加复杂

这种对组件的`控制反转`减少了应用中传递的 props 数量，使代码更加干净，对根组件把控更深，特别是当我们使用 Ts 来进行类型控制的时候，中间传递者再也不需要考虑 props 如何消费，只负责传递即可

那么我们来看看什么是`控制反转`

## 二. 什么是控制反转

我们经常会使用`控制反转`的技巧来进行代码`解耦合`

那么什么是控制反转呢, 我们来看看这样一个场景

### 2.1 场景

如果我们有个 car 类, 需要使用到 engine(引擎)和 tires(轮胎)

```js
import engine from "engine";
import tires from "tires";

class Car {
  constructor() {
    this.engine = new engine();
    this.tires = tires.getInstance();
  }
}
```

可以看到，engine 是通过 new 创建实例的，而 tires 是通过工厂模式的 getInstance 获取实例的,这样会有什么坏处呢

car 与 engine 和 tires 获取实例的方法高度耦合，倘如我们更改了 tires 获取实例的办法，那么需要找到使用了 tires 的地方全部进行修改

### 2.2 优化

此时我们可以定义一个容器

```js
import engine from "engine";
import tires from "tires";
import Container from "contanier";

// 充当中间人
const container = new Container();
container.bind("engine", engine);
container.bind("tires", tires);

class Car {
  constructor() {
    // 只需关注中间人传过来的值即可
    this.engine = container.get("engine");
    this.tires = container.get("tires");
  }
}
```

这样我们就利用 container 实现了解耦合

其实上面的 Component Composition 也是控制反转的一种设计模式

