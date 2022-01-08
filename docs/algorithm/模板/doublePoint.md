---
id: doublePoint
title: 双指针算法
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

## 一. 算法思想

通过双指针算法,可以将暴力的 O(n^2)优化为 O(n), 前提是 i 和 j 存在单调关系

## 二. 算法模板

```cpp

for (int i = 0; i < n; i++) {
  while(j <= i && check(i, j))

  // 逻辑
}

```

## 三. 经典题目

### 最长连续不重复子序列

给定一个长度为 n 的整数序列，请找出最长的不包含重复的数的连续区间，输出它的长度。

#### 输入格式

第一行包含整数 n。

第二行包含 n 个整数（均在 0∼105 范围内），表示整数序列。

#### 输出格式

共一行，包含一个整数，表示最长的不包含重复的数的连续区间的长度。

#### 数据范围

1≤n≤105

#### 输入样例：

5

1 2 2 3 5

#### 输出样例：

3

#### 代码

```cpp
#include <iostream>

using namespace std;

const int N = 100010;
int n, s[N], a[N];

int main () {
    cin >> n;

    for (int i = 0; i < n; i++) cin >> a[i];

    int res = 0;

    for (int i = 0, j = 0; i < n; i++) {
        s[a[i]]++;

        while (s[a[i]] > 1) {
            s[a[j]]--;
            j++;
        }

        res = max(res, i - j + 1);
    }

    cout << res << endl;

    return 0;
}
```
