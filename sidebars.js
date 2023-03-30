/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  vue: {
    简介: ["vue/vue-intro"],
    响应式: ["vue/reactivity/ref"],
  },
  vim: {
    简介: ["vim/intro"],
    集合: ["vim/fold"],
  },
  algorithm: {
    二叉树: [
      "algorithm/二叉树/preOrder",
      "algorithm/二叉树/inOrder",
      "algorithm/二叉树/postOrder",
    ],
    动态规划: ["algorithm/Dynamic-programming/Dynamic-programming"],
    手写函数: [
      "algorithm/手写函数/call",
      "algorithm/手写函数/apply",
      "algorithm/手写函数/extends",
      "algorithm/手写函数/lazyload",
      "algorithm/手写函数/unique",
      "algorithm/手写函数/assign",
      "algorithm/手写函数/lru",
      "algorithm/手写函数/promise",
      "algorithm/手写函数/ajax",
      "algorithm/手写函数/instanceof",
    ],
    算法模板: [
      "algorithm/模板/trie",
      "algorithm/模板/quickSort",
      "algorithm/模板/mergeSort",
      "algorithm/模板/binarySearch",
      "algorithm/模板/doublePoint",
      "algorithm/模板/qianzhuihe",
      "algorithm/模板/monotonousStack",

      "algorithm/算法思维/dp",
    ],
  },
  react: {
    React: [
      "react/react-hooks",
      "react/react-props-drilling",
      "react/react-mental-modal",
      "react/react-performance-optimization",
      "react/react-reuseability",
    ],
    Redux: ["redux/redux-hoc"],
    ReactRouter: ["react-router/react-router-v6"],
  },
  工程化: {
    权限设计: ["project/auth"],
  },
  技术设计: {
    Design: ["design/table"],
  },
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};
