---
id: react-mental-modal
title: React中的心智模型是什么
---

本篇博客用来描述React中的心智模型的理念

## 1.React心智模型

### 1.1 是什么
mental modal

class components 和 function component 做了相同的事情，但是写法不一样, 所以可以属于心智模型(mental modal)的范畴

从VNode设计中的俩种组件(class component and function component)分析Hooks的优势

先来学习一下React中的心智模型是什么

## 2. 函数式组件和类组件的区别

从VNode的设计来看，`Function component`是一种`pure component`, 在函数式组件中是没有存储状态的, 所以在

渲染的时候是要比class component性能优越的.

为什么在React hooks中有了useState这种存储状态的hook, 他依然是一个pure component呢？

这与React的心智模型(mental modal)息息相关

### 2.1 区别一

> Function components capture the rendered values.

state -> immutable, this -> mutable

`class`组件在读取数据的时候是从`this.props`读取, 虽然`props`是不可变得，但是this是可以变

如果用户在发送请求没有结束的时候更改了`this.props`(因为this是可变的, 不同于单独的props), class组件将会读到最新的`new props`

我们经常在`React class component`中书写这样的代码

```typescript jsx

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showMessage() {
    alert('Followed ' + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage, 3000);
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}

```

> This problem isn’t even unique to React — you can reproduce it in any UI library that puts data into a mutable object like this

这样写将`immutable state` 放在 `mutable object` ->　`this`, 绑定在了class中的this

来避免读取了父组件中的`this.props`造成的问题

而函数式组件捕获的是`immutable props`, 这样就不会产生`class component`造成的问题

-------


如果在函数式组件中想要利用类似于`class`组件中`this.props`的`mutable`特性, 可以使用useRef的hook

> useRef is the escape hatch into the mutable imperative world

```typescript jsx

function MessageThread() {
  const [message, setMessage] = useState('');

  // Keep track of the latest value.
  const latestMessage = useRef('');
  
  // mount update willUnmount调用
  useEffect(() => {
    latestMessage.current = message;
  });

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

```

在React现在的`concurrent mode`下，使用函数式组件的`immutable props`特性

可以在`concurrent mode`下运行变得更加可预测

# 参考文献

- [how-are-function-components-different-from-classes](https://overreacted.io/how-are-function-components-different-from-classes/)