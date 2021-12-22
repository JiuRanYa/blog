---
id: redux-hoc
title: 从Redux源码中的HOC模式探索
---

本篇博客记录`Redux`源码的学习过程, 探索`逻辑复用`的一种处理方案`HOC`在`Redux`中的体现

## 1.React-Redux中HOC模式的探索

### 1.1 Redux工作流

View binding library --> React Redux

从 React-Redux 解析HOC模式, 对比Custom Hooks的逻辑复用思路

## 2. Redux 工作思路

### 2.1 三大理念

- State只读: `Immutable state`

- 单一数据源: `Single datasource`

- 纯函数修改state: `Pure function`


遵循React的`immutable state`, 唯一修改`state`的方式是`dispatch action`

```typescript jsx

// 1. 创建store容器，传入reducer
let store = createStore(counterReducer);


// 2. 编写reducer pure function
function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case "counter/incremented":
        return { value: state.value + 1 };
      case "counter/decremented":
        return { value: state.value - 1 };
      default:
        return state;
    }
}

// 3.订阅变化, 修改DOM, 实际在开发中可以使用React - Redux进行修改 - view binding library
store.subscribe(() => {
    const dom = document.getElementById("store_div");
    dom.innerHTML = `store Value: ${store.getState().value}`;
});

```

源码也很简单.

### 2.2 容器组件和展示组件分离

`容器组件`和`展示组件`分离是从HOC模式开始的

如何将`React`与`Redux`绑定在一起 ：`View binding library` --> `React-Redux`

React实现的展示组件和Redux实现的容器组件不产生依赖, `低耦合`

使用`React-Redux`这种`View binding library`进行`props`映射，将容器组件中的state映射到展示组件的props中

在`Redux-toolkit`帮助我们处理的这些事情，不需要进行`connect()`进行绑定

## 3. Redux-thunk


in order to handle async request

### 3.1 Redux-thunks 工作原理

在`Redux-thunks`源码的`index.js`文件中做了个简单的判断:

如果`patch`的类型是`function`, 就交给`redux-thunks`处理

异步处理结构:

```typescript jsx
(functionProps) => (dispatch) => (async fetch) => operation
```

这里是redux-thunk中间件的`链式调用`

在`Redux-thunks`的index中进行验证，如果`dispatch`的值是`函数`，那么交给`Redux-thunks`处理，所以这里没有使用createAsyncThunk的API
答案： 当 `action` 创建函数返回函数时，这个函数会被 `Redux Thunk middleware` 执行。这个函数并不需要保持纯净；它还可以带有副作用
包括执行异步 API 请求。这个函数还可以 `dispatch action`，就像 `dispatch` 前面定义的同步 action 一样。
在这里的`redux-thunk`中使用了`dispatch`

example:

```typescript

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

```

### 3.2 Redux如何引入Redux-thunk的中间件

使用`applyMiddleware()`

```typescript

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)

```

注意: 在Redux-toolkit中已经默认支持Redux-thunk，不需要配置 

thunk的优点是可以再次被dispatch, 这样我们可以很方便的处理异步请求

比如loading, error, isFetching状态, 所以Redux-thunk是处理异步请求比较好的方案

当然你也可以使用react-query等`data-fetching`之类的库去进行处理

## 4. 理解 middleware 中间件

### 4.1 特性

最优秀的特征: `链式引用`， 多个中间件组合

```typescript

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

let store = createStore(
  todos,
  [ 'Use Redux' ],
  applyMiddleware(logger)
)

```

applyMiddleware接受一个middleware的数组

### 4.2 源码部分:

```typescript

export default function applyMiddleware(
  // 结构中间件, 链式调用
  // createStore第二个或者第三个参数
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => {
    const store = createStore(reducer, preloadedState)
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    // 把中间件的参数middlewareAPI传递给所有的中间件函数
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 调用了compose方法， 组合不同的函数
    // 组合函数, funcs = [f,g,h] => f(g(h(...args))),把所有中间件串联，上个中间件的结果将传递给下一个中间件
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

    // 返回createStore, 用新的dispatch覆盖之前的dispatch实现中间件的链式调用
    // 返回一个getState和变更的dispatch方法给中间件函数, 实现对dispatch的增强
    return {
      ...store,
      dispatch
    }
  }
}

```

`middleware`的结果将作为下一个`middleware`的`参数`传入

所以redux的middleware是这样的结构

```typescript

function middlewara() {
  // 可以看到这里对应源码中的middlewaraAPI
  return ({ getState, dispatch }) => next => action => {
    return next(action)
  }
}

```

所以redux-thunk的关键代码是这样的:

```typescript

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

```






