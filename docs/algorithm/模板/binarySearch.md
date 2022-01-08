---
id: binarySearch
title: 二分算法
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
int binarySearch (int l, int r) {
  while(l < r){
    int mid = l + r >> 1;
    if(check(mid)) r = mid;
    else l = mid + 1;
  }

  return l;
}
```

当更新 l 的时候需要加 1

```cpp
int binarySearch (int l, int r) {
  while(l < r){
    int mid = l + r + 1 >> 1;
    if(check(mid)) l = mid;
    else r = mid - 1;
  }

  return l;
}
```
