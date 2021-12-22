---
id: react-reuseability
title: React中逻辑复用历程
---

本篇博客对React17的Hooks源码进行了剖析, 目的是理解React的Hooks设计


# 一.历程总览

Mixin => HOC容器组件 => Render Props => Hooks

HOC(装饰器模式): 将组件作为参数，返回另一个组件。将新的功能或者数据装饰到旧组件上实现逻辑复用

Render Props(代理模式): 返回this.props.render，将props中的render传入的组件进行代理，实现逻辑复用

Hook: 