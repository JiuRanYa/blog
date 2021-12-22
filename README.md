# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

个人网站通过 [Docusaurus 2](https://docusaurus.io/) 创建，一个静态网站生成器

## Installation   安装依赖

```console
yarn install
```

## Local Development   本地环境

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build   本地编译

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
