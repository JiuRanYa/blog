---
id: mergeSort
title: 归并排序
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

```cpp
const int N = 1e6 + 10;
int res[N];
int tem[N];

void merge_sort(int q[], int l, int r) {
    if (l >= r) return;

    // 1. 确定中心
    int mid = l + r >> 1;

    // 2. 递归处理left, right
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

    // 3. 二路归并 --> 左边找最小的, 右边找最大的
    int i = 0, j = r, k = 0;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tem[k ++ ] = q[i ++ ];
        else tem[k ++ ] = q[j ++ ];
    // 4. 剩余项处理
    while(i <= mid) tem[k++] = q[i++];
    while(j <= r) tem[k++] = q[j++];

    for (i = l, j = 0; i <= r; i ++, j ++ ) q[i] = tem[j];
}
```

## 二. 经典题目

### 1. 逆序数对的数量

给定一个长度为 n 的整数数列，请你计算数列中的逆序对的数量。

逆序对的定义如下：对于数列的第 i 个和第 j 个元素，如果满足 i<j 且 a[i]>a[j]，则其为一个逆序对；否则不是。

#### 输入格式

第一行包含整数 n，表示数列的长度。

第二行包含 n 个整数，表示整个数列。

#### 输出格式

输出一个整数，表示逆序对的个数。

#### 数据范围

1≤n≤100000，
数列中的元素的取值范围 [1,109]。

#### 输入样例：

6

2 3 4 5 6 1

```cpp
#include <iostream>

using namespace std;

const int N = 1e6 + 10;
int a[N];
int temp[N];

long long res;

void mergeSort(int q[], int l, int r) {
    if (l >= r) return;

    int mid = l + r >> 1;

    mergeSort(q, l, mid);
    mergeSort(q, mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while(i <= mid && j <= r){
        if(q[i] <= q[j]) temp[k ++] = q[i ++];
        else {
            res += mid - i + 1;
            temp[k ++] = q[j ++];
        }
    }
    while (i <= mid) temp[k++] = q[i++];
    while (j <= r) temp[k++] = q[j++];

    for (i = l, j = 0; i <= r; i ++, j ++ ) q[i] = temp[j];
}

int main () {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i ++ ) scanf("%d", &a[i]);

    mergeSort(a, 0, n - 1);

    cout << res ;
}
```
