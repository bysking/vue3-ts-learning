# vue3-ts-learning

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Vue3 + ts 打造企业级组件库 学习文档

> 前期准备 代码美化插件[prettier](prettier.io)插件安装，帮助统一化代码风格

-   vscode 中的 prettier 配置

    1. 插件市场搜索安装 Prettier - Code formatter
    2. 项目配置文件 .prettierrc

        ```js
        {
            "trailingComma": "all", // 对象行后面追加逗号
            "tabWidth": 4,
            "semi": false, // 语句后是否使用分号
            "singleQuote": true, // 是否使用单引号
            "arrowParens": "always" // 箭头函数单个参数是否添加括号（x）=> x
        }
        ```

    3. vscode 修改文件后的保存配置，在设置中搜索'format'配置切换窗口自动保存
    4. 启用 formatter, 然后搜索 format 的默认插件 选择安装好的 prettier
