---
id: table
title: Table design
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 设计一个高性能table
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 导读

一个可拖拽`Column`的`Table`，高性能、支持大数据量

需要支持大数据量，我们需要用虚拟滚动来提高性能

综上，我们需要一个`支持拖拽`、`虚拟滚动`、`节点可复用`的`高性能`Table

分俩个技术点来进行实现和探索

- Drag Column
- Virtual Scroll

## 一.Drag Column

可拖拽的列的Table大概有俩种实现方式

### 1. 公共的技术点：

监听三个事件：`Mousedown`、`MouseUp`、`Mousemove`

### 2. 俩种不同实现方案

#### 2.1 通过监听事件获得拖拽信息

该技术方案获取column index的相关拖拽信息，并操作Table绑定的数据，让Table刷新，来做到改变Column的效果
```js
// 通过监听事件来计算出拖拽行为，例如下面的信息表示：将第3列移动到第2列的前面

[3, 2, 'front']
```
改技术点的优劣很明显

- 优势：实现思路简单，不需要复杂的计算

- 劣势：得到拖拽信息后，改表原表的数据，`Table会重新刷新`

#### 2.2 隐藏原Table，重组DOM结构

该技术的思路为：

当用户触发`Mousedown`事件时，隐藏原来的Table，并且分析原Table的DOM结构，将每一列放在一个div中，并监听`Mousemove`事件，移动时，通过`placeholder` dom来进行占位，给用户一种在原表上进行拖拽的视觉效果。

当拖拽行为完成时，得到拖拽信息，手动获取每行的第n、m列，进行dom移动操作

优势：
- 用户交互体验好，隐藏原表，用新的DOM结构并添加占位各，`所见即所得`

劣势：
- 隐藏原表，需要分析DOM结构并且将样式复用在交互div上，由于开发人员可能会在Table的任意位置加上class，`可能会出现样式和原表不一致的问题`。
- 拖拽后在原表上进行DOM操作，在大量数据场景下需要交换每行的目标tr
- 提供一个交互DOM，由原Table结构分析得来，`在数据量大的情况下分析耗时长`

#### 2.3 采用第二种方案并提高性能

权衡下我采用了第二种实现方案，通过分析Table下的Thead和TBody结构，提供一个交互的div

需要解决俩个问题：

- 数据量大时DOM操作
- 数据量大时分析Table结构，重组div时有频繁的dom clone

可以看到主要问题为：`数据量大时，Table tr td很多`

于是我引入了`虚拟滚动`

## 二.Virtual Scroll

虚拟滚动是常见的大数据渲染解决方案

在实现可拖拽Column时，采用了第二种解决解决方案，该方案中需要在拖拽结束后，手动将每一行的俩个td交换位置，那么在虚拟滚动场景下就存在一个问题：

假设当前窗口可容纳6行table item

采用虚拟滚动下只渲染了6条，如果进行拖拽，我们会交换当前6行中的第n列和第m列，此时如果向下滚动，会发现下面的table item的列并没有交换，这也是可以理解的，因为在拖拽时，只交换了渲染出来的6行的俩列

如何解决呢？很简单，`复用`里面的每个行即可

// writing

至此，我们有了一个`reuseable`、`draggable`、`virtual scroll`的高性能table
