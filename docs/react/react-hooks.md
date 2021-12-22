---
id: react-hooks
title: React hooks 源码全方位解析
---

本篇博客对React17的Hooks源码进行了剖析, 目的是理解React的Hooks设计


## 1. useEffect

### 用法
```typescript

function useEffect(effect: EffectCallback, deps?: DependencyList): void;

```

对应的生命周期: `Mount`, `Update`, `WillUnmount`

在`deps`发生改变的时候执行`effectCallback`, 如果依赖为空, 那么`Effect`会在`Mount`的时候执行一次

如果想在`Unmount`卸载阶段进行卸载监听和订阅, 需要返回一个`匿名函数`

Warning: 如果没有在`WillUnmount`阶段对监听和订阅进行卸载, 一直存在可能会造成内存泄露

```typescript

import {useEffect} from "react";

useEffect(() => {
  document.addEventListener("mousemove", handleMouseMove)
  
  return () => {
    document.removeEventListener("mousemove", handleMouseMove)
  }
}, [])

```

### 源码实现:

### 1.1 入口定义
```typescript

export function useEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}

```

### 1.2 resolveDispatch()

```typescript

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
 
  // ...
  
  return ((dispatcher: any): Dispatcher);
}

```

### 1.3 ReactCurrentDispatcher.current

```typescript

const ReactCurrentDispatcher = {
  current: (null: null | Dispatcher)
}

```


### 1.4 源码在react-reconciler中的ReactFiberHooks


## 2. useState

### 2.1 fiber设计

在`function component`中利用`fiber`保存了`hooks`列表

```typescript jsx

// TODO: first hook's action

type Fiber = {|
  // 记录function component的hooks列表, 单链表结构
  memoizedState: any
  
  |}

```

### 2.2 dispatchAction执行update

```typescript jsx
import {useState} from "react";

const [num, setNum] = useState(0)

```

调用setNum时, 实际上是调用了`dispatchAction.bind()`

在`dispatchAction`创建了`update`的环状单链表`updateQueue`

```typescript

// 环状单向链表
const update: Update<S, A> = {
  lane,
  action,
  eagerReducer: null,
  eagerState: null,
  next: (null: any),
};

```

## 3 useState and useReducer

### 3.1 理解

首先需要明白的是, `useState`和`useReducer`这俩个`hooks`是`Redux`的创始人`Dan`加入React核心团队后带来的变化

所以在理解这俩个hooks的设计理念的时候, 可以多想想Redux中`dispatch`和`action`的概念, 方便理解这俩个`Hooks`

```typescript

function useState(initialState) {
  // resolveDispatcher读取ReactCurrentDispatcher.current获取当前的dispatcher
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

```

在`mounted`的时候俩者中的`lastRenderedReducer`不同

- `useState`是`basicStateReducer`

- `useReducer`是我们自己传入的`Reducer`

> 俩个Hook在更新state的时候逻辑和updateQueue的更新逻辑是差不多的，循环更新函数，计算出新的state

### Q1: 为什么采用了环状单链表的结构?

在调度阶段取得第一个`initialState`, 然后循环调用`updateQueue`,

执行`update`保存的`action`更新函数, 将计算后的`state`返回

这时候需要和第一个`update`比较判断来确保所有的`update`都执行结束


## 4. useEffect and useLayoutEffect

### 4.1 useEffect

当我们修改了数据需要`update`, `React` 调用`mutation`之前会对副作用函数进行`flush`

执行`flushPassiveEffects` --> 然后执行`flushPassiveEffectsImp`

在`flushPassiveEffectsImp`中会清除所有useEffect的销毁函数

```typescript

var unmountEffects = pendingPassiveHookEffectsUnmount;
pendingPassiveHookEffectsUnmount = [];
// 清楚所有useEffect的销毁函数
for (var i = 0; i < unmountEffects.length; i += 2) {
  var _effect = unmountEffects[i];
  var fiber = unmountEffects[i + 1];
  var destroy = _effect.destroy;
  _effect.destroy = undefined;

  {
    fiber.effectTag &= ~PassiveUnmountPendingDev;
    var alternate = fiber.alternate;

    if (alternate !== null) {
      alternate.effectTag &= ~PassiveUnmountPendingDev;
    }
  }

  if (typeof destroy === 'function') {
    {
      setCurrentFiber(fiber);

      {
        invokeGuardedCallback(null, destroy, null);
      }

      if (hasCaughtError()) {
        if (!(fiber !== null)) {
          {
            throw Error( "Should be working on an effect." );
          }
        }

        var error = clearCaughtError();
        captureCommitPhaseError(fiber, error);
      }

      resetCurrentFiber();
    }
  }
} // Second pass: Create new passive effects.

```

按照`全部销毁` --> `全部执行` 的顺序，确保ref的引用正确

> 注意: useEffect的更新是在layout阶段之后异步执行, 源码体现在这里

```typescript


// 根据不同的fiber类型进行处理 --> commitFiberToLayout
function commitLifeCycles(finishedRoot, current, finishedWork, committedLanes) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block: {
      // At this point layout effects have already been destroyed (during mutation phase).
      // This is done to prevent sibling component effects from interfering with each other,
      // e.g. a destroy function in one component should never override a ref set
      // by a create function in another component during the same commit.
      {
        // useLayoutEffect --> 这里直接commit了，执行useLayout
        commitHookEffectListMount(Layout | HasEffect, finishedWork);
      }

      // effect function --> 销毁和回调  --> 先进行了调度, 存在了俩个数组中, 并没有执行 --> 在结束后统一异步执行
      schedulePassiveEffects(finishedWork);
      return;
    }
  }
}
```

### 4.2 useEffect和useLayout的区别:

- `useEffect`在`commitFiberToLayout`阶段(Layout阶段)开启调度, 把回调函数和销毁函数保存, 在Layout阶段结束后统一`异步`调用

- `useLayoutEffect`在`Layout`阶段`同步`执行, 直接`commit` --> `commitHookEffectListMount`
  

React在执行

```typescript




```

## 5. useRef   

总述: useRef -->  通往 mutable 的通道

### 5.1 是什么

从`6.不同Hook的dispatcher`可以看到useRef同样分为俩个函数`mountRef`和`updateRef`

```typescript

function mountRef<T>(initialValue: T): {|current: T|} {
  // 获取当前hook
  const hook = mountWorkInProgressHook();
  if (enableUseRefAccessWarning) {
    // do something 
  } else {
    const ref = {current: initialValue};
    hook.memoizedState = ref;
    return ref;
  }
}

```


```typescript

function updateRef<T>(initialValue: T): {|current: T|} {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}

```


```typescript

export function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  return refObject;
}

```

可以看到`useRef`本质上就是一个包含`current`的对象

### 5.2 如何工作

机制描述 --> 通过`topic`来确定`mutation`操作

`React`在`commit`的阶段时进行`mutation`操作, 根据不同的`effectTag`来对DOM进行操作

`effectTag`是一个单纯的二进制, 通过位操作符的原理来进行比对时的优化, 不同的操作类型是这样的

本质上是一种 `topic and mutation` 

```typescript

export type Flags = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoFlags = /*                      */ 0b00000000000000000000000;
export const PerformedWork = /*                */ 0b00000000000000000000001;

// 这里的Tag标识了要对DOM进行何种mutation操作
// You can change the rest (and add more).
export const Placement = /*                    */ 0b00000000000000000000010;
export const Update = /*                       */ 0b00000000000000000000100;
export const PlacementAndUpdate = /*           */ Placement | Update;
export const Deletion = /*                     */ 0b00000000000000000001000;
export const ChildDeletion = /*                */ 0b00000000000000000010000;

```

所以，对于`HostComponent`、`ClassComponent`如果包含`ref`操作，那么也会赋值相应的`effectTag`

#### 1. render阶段

##### 1.1 标记`topic`
在render阶段通过markRef来对含有`ref`的`fiber`标记effectTag

```typescript

function markRef(current: Fiber | null, workInProgress: Fiber) {
  const ref = workInProgress.ref;
  if (
    (current === null && ref !== null) ||
    (current !== null && current.ref !== ref)
  ) {
    // Schedule a Ref effect
    workInProgress.flags |= Ref;
    if (enableSuspenseLayoutEffectSemantics) {
      workInProgress.flags |= RefStatic;
    }
  }
}

```

##### 1.2 何时赋值?

在commitLayout阶段对ref进行赋值`commitAttachRef`

```typescript

function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    // 获取ref属性对应的Component实例
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    // 赋值ref
    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}
```

总结下组件对应fiber被赋值Ref effectTag需要满足的条件：

- `fiber`类型为`HostComponent`、`ClassComponent`、`ScopeComponent`（这种情况我们不讨论）

- mount阶段存在ref属性

- update阶段ref属性改变


#### 2. commit阶段

##### 2.1 移除之前的ref指向

```typescript


function commitMutationEffects(root, renderPriorityLevel) {
  // TODO: Should probably move the bulk of this function to commitWork.
  while (nextEffect !== null) {
    setCurrentFiber(nextEffect);
    var effectTag = nextEffect.effectTag;

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 如果是Ref
    if (effectTag & Ref) {
      var current = nextEffect.alternate;

      if (current !== null) {
        commitDetachRef(current);
      }
    } // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every possible
    // bitmap value, we remove the secondary effects from the effect tag and
    // switch on that value.

    resetCurrentFiber();
    nextEffect = nextEffect.nextEffect;
  }
}

```

上面可以看到, 如果是Ref, 执行了`commitDetachRef`方法, 这个方法清除了`ref`的`current`指向

```typescript

function commitDetachRef(current) {
  var currentRef = current.ref;

  if (currentRef !== null) {
    if (typeof currentRef === 'function') {
      currentRef(null);
    } else {
      // 移除之前的ref
      currentRef.current = null;
    }
  }
}

```


##### 2.2 根据`topic`确定`mutation`类型

```typescript

function commitMutationEffects(root, renderPriorityLevel) {
  // TODO: Should probably move the bulk of this function to commitWork.
  while (nextEffect !== null) {
    setCurrentFiber(nextEffect);
    var effectTag = nextEffect.effectTag;

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 如果是Ref
    if (effectTag & Ref) {
      var current = nextEffect.alternate;

      if (current !== null) {
        commitDetachRef(current);
      }
    } // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every possible
    // bitmap value, we remove the secondary effects from the effect tag and
    // switch on that value.
    

    // 在确定了effectTag进行的mutation操作之后, 需要进行处理, 处理逻辑在下面的switch中
    resetCurrentFiber();
    nextEffect = nextEffect.nextEffect;
  }
}
```

在确定了effectTag进行的mutation操作之后, 需要进行处理, 处理逻辑在下面的switch中

```typescript

// 这里是位操作符, React中的mutation对应的topic都是二进制(都是2的倍数), 如果你不太理解你可以把它当成 逻辑运算符 与
var primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating);

switch (primaryEffectTag) {
  case Placement:
    {
      commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
      // inserted, before any life-cycles like componentDidMount gets called.
      // TODO: findDOMNode doesn't rely on this any more but isMounted does
      // and isMounted is deprecated anyway so we should be able to kill this.

      nextEffect.effectTag &= ~Placement;
      break;
    }

  case PlacementAndUpdate:
    {
      // Placement
      commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
      // inserted, before any life-cycles like componentDidMount gets called.

      nextEffect.effectTag &= ~Placement; // Update

      var _current = nextEffect.alternate;
      commitWork(_current, nextEffect);
      break;
    }

  case Hydrating:
    {
      nextEffect.effectTag &= ~Hydrating;
      break;
    }

  case HydratingAndUpdate:
    {
      nextEffect.effectTag &= ~Hydrating; // Update

      var _current2 = nextEffect.alternate;
      commitWork(_current2, nextEffect);
      break;
    }

  case Update:
    {
      var _current3 = nextEffect.alternate;
      commitWork(_current3, nextEffect);
      break;
    }

  case Deletion:
    {
      commitDeletion(root, nextEffect);
      break;
    }
}
```


##### 2.3执行`mutation`操作

在上文的`switch`结构中确定了`mutation`类型, 如果是`Deletion`会执行`commitDeletion`操作

在`commitDeletion`——`unmountHostComponents`——`commitUnmount`——`ClassComponent | HostComponent`类型case中调用的`safelyDetachRef`方法负责执行类似`commitDetachRef`的操作。

```typescript

function safelyDetachRef(current: Fiber) {
  const ref = current.ref;
  if (ref !== null) {
    if (typeof ref === 'function') {
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current, refError);
      }
    } else {
      ref.current = null;
    }
  }
}

```

## 6. 不同 Hook的 dispatcher

有这么三个不同的dispatcher来判断是什么时候执行的更新

```typescript


// 已经在Hook中，如果有嵌套的Hook throw 一个 Error
export const ContextOnlyDispatcher: Dispatcher = {
  readContext,

  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useMutableSource: throwInvalidHookError,
  useOpaqueIdentifier: throwInvalidHookError,

  unstable_isNewReconciler: enableNewReconciler,
};

// 挂载时的dispatcher
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useOpaqueIdentifier: mountOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};

// 更新时的dispatcher
const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useOpaqueIdentifier: updateOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};
```

在执行的时候通过给`ReactCurrentDispatcher`的`current`属性赋值来确定处于什么状态

