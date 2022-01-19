---
id: trie
title: Trie树
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

## 一. 算法模板

Trie 是一种高效存储和查找字符串的数据结构，本质上是一种树

```cpp
#include <iostream>

using namespace std;

const int N = 100010;

// idx开辟新路径,每个节点唯一标识符
int son[N][26], cnt[N], idx;
char str[N];

void insert (char str[]) {
    int p = 0;

    for (int i = 0; str[i]; i++) {
        int u = str[i] - 'a';
        if (!son[p][u]) son[p][u] = ++idx;
        p = son[p][u];
    }

    cnt[p]++;
}

int query (char str[]) {
    int p = 0;
    for (int i = 0; str[i]; i++) {
        int u = str[i] - 'a';
        if (!son[p][u]) return 0;
        p = son[p][u];
    }

    return cnt[p];
}
```

## 二. 经典题目

### 1. 最大异或对

在给定的 N 个整数 A1，A2……AN 中选出两个进行 xor（异或）运算，得到的结果最大是多少？

#### 输入格式

第一行输入一个整数 N。

第二行输入 N 个整数 A1 ～ AN。

#### 输出格式

输出一个整数表示答案。

#### 数据范围

1≤N≤105,

0≤Ai<231

#### 输入样例：

3

1 2 3

#### 输出样例：

3

```cpp
#include <iostream>

using namespace std;

const int N = 100010, M = 3000010;

int a[N], q[M][2], idx;

void insert (int x) {
    int p = 0;

    for (int i = 31; i >= 0; i--) {
        int u = x >> i & 1;
        if (!q[p][u]) q[p][u] = ++idx;
        p = q[p][u];
    }
}

int query (int x) {
    int p = 0, res = 0;
    for (int i = 31; i >= 0; i--) {
        int u = x >> i & 1;
        if (q[p][!u]) {
            p = q[p][!u];
            res += 1 << i;
        } else {
            p = q[p][u];
        }
    }

    return res;
}

int main()
{
    int n;
    cin >> n;
    int maxXorNum = 0;
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
        insert(a[i]);
        maxXorNum = max(maxXorNum, query(a[i]));
    }

    cout << maxXorNum << endl;

    return 0;
}
```
