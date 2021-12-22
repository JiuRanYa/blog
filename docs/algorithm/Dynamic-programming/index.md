---
id: Dynamic-programming
title: 动态规划问题详解
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 算法动态规划详解
keywords:
  - JavaScript
  - frontend
# image: https://i.imgur.com/mErPwqL.png
---


## 一.数据结构的存储方式

数据结构的存储方式只有俩种：数组(顺序存储)和链表(链式存储)

> 算法设计⽆⾮就是先思考“如何穷举”，然后再追求“如何聪明 地穷举

## 二.动态规划详解

思维框架
> 明确「状态」 -> 定义 dp 数组/函数的含义 -> 明确「选择」-> 明确 base case

### 1.斐波那契数列

### 方法一:暴力递归

```js
function fib(num){
    if(num == 1 || num == 2) return 1;
    return fib(num - 1) + fib(num -2);
}

console.log(fib(8));
```

时间复杂度为O(2^n)

这样写代码虽然简洁易懂，但是⼗分低效

PS：但凡遇到需要递归的问题，最好都画出递归树，这对你分析算法的复 杂度，寻找算法低效的原因都有巨⼤帮助。

递归算法的时间复杂度怎么计算？⼦问题个数乘以解决⼀个⼦问题需要的时间。

### 方法二:重叠⼦问题
* 带备忘录的递归解法

即然耗时的原因是重复计算， 那么我们可以造⼀个「备忘录」，每次算出某个⼦问题的答案后别急着返 回，先记到「备忘录」⾥再返回；每次遇到⼀个⼦问题先去「备忘录」⾥查 ⼀查，如果发现之前已经解决过这个问题了，直接把答案拿出来⽤，不要再 耗时去计算了

1.带备忘录的递归解法

> 主要思路:用备忘录把计算过的值保存下来，如果再遇到，直接从备忘录中获取。用一个长度为N且值全部为0的数组进行记录是否计算过

```js
function fib(n){
    if(n < 1) return 0;
    let ary = new Array(n)
    ary.fill(0)
    return help(ary,n)
}

function help(ary,n){
    if(n == 1 || n == 2) return 1;
    if(memo[0] != 0) return memo[0]
    memo[n] = help(memo, n - 1) + help(memo, n - 2);
    return memo[n];
}
```

时间复杂度为O(n)

2.细节优化:

把空间复杂度降为 O(1)

```js
function fib(n){
    if(n == 2 || n == 1) return 1;
    let prev = 1,
        curr = 1
    for(i = 3; i <= n; i++){
        let next = prev + curr;
        prev = curr;
        curr = prev;
    }
    return curr;
}
```

### 2.凑零钱问题
> 先看下题⽬：给你 k 种⾯值的硬币，⾯值分别为 c1, c2 ... ck ，每种硬 币的数量⽆限，再给⼀个总⾦额 amount ，问你最少需要⼏枚硬币凑出这个 ⾦额，如果不可能凑出，算法返回 -1 。

* 1.先确定状态值：总金额amount
* 2.确定Dp函数的定义：当目标金额为N时，所需要的最少硬币
```python
def coinChange(coins: List[int], amount: int):
 # 定义：要凑出⾦额 n，⾄少要 dp(n) 个硬币 
  def dp(n): 
 # 做选择，选择需要硬币最少的那个结果 
  for coin in coins: 
    res = min(res, 1 + dp(n - coin)) 
    return res 
  # 我们要求的问题是 dp(amount) 
  return dp(amount)
```
* 3.确定选择并择优:选一个硬币，金额减少，从而触发状态转移
```python
def coinChange(coins: List[int], amount: int): 
  def dp(n): # base case 
  if n == 0: return 0 if n < 0: return -1 
  # 求最⼩值，所以初始化为正⽆穷 
  res = float('INF') 
  for coin in coins: 
    subproblem = dp(n - coin) 
    # ⼦问题⽆解，跳过 
    if subproblem == -1: continue 
    res = min(res, 1 + subproblem) 
    return res if res != float('INF') else -1 return dp(amount)
```
* 4.明确base和case