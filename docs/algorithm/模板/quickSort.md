---
id: quickSort
title: 快速排序
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

基于分治做排序

```cpp
void quick_sort(int ary[], int l, int r) {
    if (l >= r) return;

    int i = l - 1, j = r + 1, x = ary[l + r >> 1];

    while(i < j) {
        do i++; while(ary[i] < x);
        do j--; while(ary[j] > x);
        if (i < j) swap(ary[i], ary[j]);
    }

    quick_sort(ary, l, j);
    quick_sort(ary, j + 1, r);
}
```
