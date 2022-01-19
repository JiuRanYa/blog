---
id: monotonousStack
title: 模拟常用的数据结构
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 算法基础
keywords:
  - quickSort
  - C++
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---

## 一. 单链表

```cpp
// head存储链表头，e[]存储节点的值，ne[]存储节点的next指针，idx表示当前用到了哪个节点
int head, e[N], ne[N], idx;

// 初始化
void init()
{
    head = -1;
    idx = 0;
}

// 在链表头插入一个数a
void insert(int a)
{
    e[idx] = a, ne[idx] = head, head = idx ++ ;
}

// 将头结点删除，需要保证头结点存在
void remove()
{
    head = ne[head];
}
```

## 二. 双链表

```cpp
// e[]表示节点的值，l[]表示节点的左指针，r[]表示节点的右指针，idx表示当前用到了哪个节点
int e[N], l[N], r[N], idx;

// 初始化
void init()
{
    //0是左端点，1是右端点
    r[0] = 1, l[1] = 0;
    idx = 2;
}

// 在节点a的右边插入一个数x
void insert(int a, int x)
{
    e[idx] = x;
    l[idx] = a, r[idx] = r[a];
    l[r[a]] = idx, r[a] = idx ++ ;
}

// 删除节点a
void remove(int a)
{
    l[r[a]] = l[a];
    r[l[a]] = r[a];
}
```

## 三. 栈

```cpp
// tt表示栈顶
int stk[N], tt = 0;

// 向栈顶插入一个数
stk[ ++ tt] = x;

// 从栈顶弹出一个数
tt -- ;

// 栈顶的值
stk[tt];

// 判断栈是否为空
if (tt > 0)
{

}

```

## 四. 队列

```cpp
// hh 表示队头，tt表示队尾
int q[N], hh = 0, tt = -1;

// 向队尾插入一个数
q[ ++ tt] = x;

// 从队头弹出一个数
hh ++ ;

// 队头的值
q[hh];

// 判断队列是否为空
if (hh <= tt)
{

}
```

## 五. 单调栈

### 1. 模板

常见模型：找出每个数左边离它最近的比它大/小的数

```cpp
int tt = 0;
for (int i = 1; i <= n; i ++ )
{
    while (tt && check(stk[tt], i)) tt -- ;
    stk[ ++ tt] = i;
}
```

### 2.输出左边第一个比它小的数

给定一个长度为 N 的整数数列，输出每个数左边第一个比它小的数，如果不存在则输出 −1。

#### 输入格式

第一行包含整数 N，表示数列长度。

第二行包含 N 个整数，表示整数数列。

#### 输出格式

共一行，包含 N 个整数，其中第 i 个数表示第 i 个数的左边第一个比它小的数，如果不存在则输出 −1。

#### 数据范围

1≤N≤105

1≤ 数列中元素 ≤109

#### 输入样例：

5

3 4 2 7 5

#### 输出样例：

-1 3 -1 2 2

#### 代码

时间复杂度 O(n)

```cpp
#include <iostream>

using namespace std;

int main () {
    int m;

    cin >> m;

    int stk[m], tt = 0;
    for (int i = 0; i < m; i++) {
        int x;

        cin >> x;

        // 如果单调栈里面有元素，开始出栈
        while(tt && stk[tt] >= x) tt--;
        if (tt) cout << stk[tt] << ' ';
        else cout << -1 << ' ';

        // 把当前值加入栈
        stk[++tt] = x;
    }

    return 0;
}
```

## 六. 单调队列

### 1. 模板

常见模型：找出滑动窗口中的最大值/最小值

```cpp
int hh = 0, tt = -1;
for (int i = 0; i < n; i ++ )
{
    while (hh <= tt && check_out(q[hh])) hh ++ ;  // 判断队头是否滑出窗口
    while (hh <= tt && check(q[tt], i)) tt -- ;
    q[ ++ tt] = i;
}
```

### 2. 滑动窗口

```cpp
#include <iostream>

using namespace std;

int main () {
    int n, k;

    cin >> n >> k;

    int q[1000010], a[1000010], hh, tt = -1;
    for (int i = 0; i < n; i++ ) scanf("%d", &a[i]);

    for (int i = 0; i < n; i++) {
        // 保证滑动窗口值
        if (hh <= tt && i - k + 1 > q[hh]) hh++;

        while (hh <= tt && a[q[tt]] >= a[i]) tt--;

        q[++tt] = i;
        if (i >= k - 1) printf("%d ", a[q[hh]]);
    }
    puts("");

    hh = 0, tt = -1;
    for (int i = 0; i < n; i++) {
        // 保证滑动窗口值
        if (hh <= tt && i - k + 1 > q[hh]) hh++;

        while (hh <= tt && a[q[tt]] <= a[i]) tt--;

        q[++tt] = i;
        if (i >= k - 1) printf("%d ", a[q[hh]]);
    }

    return 0;
}
```

## 七. 堆

### 1. 用数组存储堆

x 左孩子: 2x, x 的右孩子: 2x + 1;

### 2. 堆的操作

- 取出最小元素: h[1]
- 删除最小元素: h[1] = h[size]; size --; down(1);
- 插入一个数: h[++size] = x; up(size);
- 删除任意一个值： h[k] = h[size]; size-- ; down(k), up(k);
- 修改任意一个元素: h[k] = x; down(k), up(k);

### 2. 核心实现

```cpp
void down(int u)
{
    int t = u;
    if (u * 2 <= cnt && heap[u * 2] < heap[t]) t = u * 2;
    if (u * 2 + 1 <= cnt && heap[u * 2 + 1] < heap[t]) t = u * 2 + 1;
    if (u != t)
    {
        swap(heap[u], heap[t]);
        down(t);
    }
}
```

## 八. 哈希表

### 1. 存储结构

- 开放寻址法
- 拉链法
