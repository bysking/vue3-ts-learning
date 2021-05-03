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

> 如何在 vue3 中定义组件

```js
<template>
    <div></div>
</template>;

import { defineComponent } from 'vue'; // 相比于vue2增加了类型定义
import HelloWorld from './components/HelloWorld.vue';
export default defineComponent({
    name: 'App',
    components: {
        HelloWorld,
    },
});
```

-   vue3 中的函数组件是没有状态的，区别于 vue2 它不再在组件定义里面使用 functional 属性

-   defineComponent 类型说明

```js
// vue-next\packages\runtime-core\src\apiDefineComponent.ts 源码类型定义路径

export type DefineComponent<
  PropsOrPropOptions = {}, // prop类型
  RawBindings = {}, // setup返回对象的类型
  D = {}, // data返回的对象类型
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions,
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
  PP = PublicProps,
  Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>,
  Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>
> = ComponentPublicInstanceConstructor<
  CreateComponentPublicInstance<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    PP & Props,
    Defaults,
    true
  > &
    Props
> &
  ComponentOptionsBase<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    Defaults
  > &
  PP

// 泛型重写

type myCmpType = DefineComponent<{ id: string }>
```

-   如何为自定义组件的 prop 声明类型

```js

interface Config {
    name: string;
}
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'App',
    props: {
        config: {
            type: Object as PropType<Config> // 因为原生的js代码不支持传入ts类型，需要借助vue3中的PropType进行断言
        }
    }
});
```

> 如何提取 Prop 定义

```js

// 因为没有上下文告诉 // 2 处，propType是一个Readonly类型，所以需要强制断言const，不然vue3解析prop的时候会认为 // 2 处的propType可能为空，导致type可能为undefined
const propType = {
    config: {
        type: String
    }
} as const;


import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'App',
    props: propType // 2
});
```

> vue 中的 render 函数

```js
import { createApp, defineComponent, h } from 'vue';
// import App from './App.vue';

let App = defineComponent({
    render() {
        return h(
            'div', // 渲染节点： 标签名或者单文件组件引用
            {
                name: '123', // 属性
            },
            [h('span', '11111'), h('span', 22222)], //子节点
        );
    },
});

createApp(App).mount('#app');
```

-   h 基于 createVnode 的封装 函数源码 vue-next\packages\runtime-core\src\h.ts

```js
// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
    const l = arguments.length; //尤大的这个l差点让人看成1
    if (l === 2) {
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            // single vnode without props
            if (isVNode(propsOrChildren)) {
                return createVNode(type, null, [propsOrChildren]);
            }
            // props without children
            return createVNode(type, propsOrChildren);
        } else {
            // omit props
            return createVNode(type, null, propsOrChildren);
        }
    } else {
        if (l > 3) {
            children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
            children = [children];
        }
        return createVNode(type, propsOrChildren, children);
    }
}

// h函数的参数
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
    // ...
}

// createVNode 的参数
declare function _createVNode(
    type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
    props?: (Data & VNodeProps) | null,
    children?: unknown,
    patchFlag?: number, // 前面的3个参数和h函数一直，我们可以把h函数直接替换成createVNode， 增强传入优化参数
    dynamicProps?: string[] | null,
    isBlockNode?: boolean,
): VNode;
```

> setup 的运用以及意义

-   reactive 的使用

```html
<template>
    <HelloWorld msg="hello world" />
    <div>{{ state.name }}</div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue';
    import HelloWorld from './components/HelloWorld.vue';

    export default defineComponent({
        name: 'App',
        components: {
            HelloWorld,
        },
        // 只会在组件初始化的时候执行一次
        setup() {
            // 声明响应式数据
            const state = reactive({
                name: '123',
            });

            setInterval(() => {
                state.name += 1;
            }, 1000);

            return {
                state,
            };
        },
    });
</script>
```

-   ref 的使用

```html
<template>
    <HelloWorld msg="hello world" />
    <div>{{ state.name }}</div>

    <!-- 渲染ref数据这里编译器帮我们做了 name.value的取值操作 -->
    <div>{{ name }}</div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue';
    import HelloWorld from './components/HelloWorld.vue';

    export default defineComponent({
        name: 'App',
        components: {
            HelloWorld,
        },
        // 只会在组件初始化的时候执行一次
        setup() {
            // 第一种方案
            const state = reactive({
                name: '123',
            });

            // 第二种方案
            const nameRef = ref('111');

            setInterval(() => {
                state.name += 1;
                nameRef.value += 1; // 值修改
            }, 1000);

            return {
                state,
                name: nameRef,
            };
        },
    });
</script>
```

-   computed 的使用

```html
<template>
    <HelloWorld msg="hello world" />
    <div>{{ computedName }}</div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, computed } from 'vue';
    import HelloWorld from './components/HelloWorld.vue';

    export default defineComponent({
        name: 'App',
        components: {
            HelloWorld,
        },
        // 只会在组件初始化的时候执行一次
        setup() {
            // 第二种方案
            const nameRef = ref('111');

            setInterval(() => {
                nameRef.value += 1; // 值修改
            }, 1000);

            const computedName = computed(() => {
                return nameRef.value + 'hh';
            });

            return {
                computedName,
            };
        },
    });
</script>
```

-   watchEffect

```html
<template>
    <HelloWorld msg="hello world" />
    <div>{{ computedName }}</div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, computed, watchEffect } from 'vue';
    import HelloWorld from './components/HelloWorld.vue';

    export default defineComponent({
        name: 'App',
        components: {
            HelloWorld,
        },
        // 只会在组件初始化的时候执行一次
        setup() {
            // 第二种方案
            const nameRef = ref('111');

            setInterval(() => {
                nameRef.value += 1; // 值修改
            }, 1000);

            const computedName = computed(() => {
                return nameRef.value + 'hh';
            });

            watchEffect(() => {
                console.log(nameRef.value);
            });

            return {
                computedName,
            };
        },
    });
</script>
```

> setup 中 render 函数的用法

```javascript
import { createApp, reactive, h, defineComponent } from 'vue';
// import { createApp, defineComponent, /*h, */ createVNode } from 'vue';
// import App from './App.vue';

let App = defineComponent({
    // render() {
    //     return createVNode(
    //         'div', // 渲染节点： 标签名或者单文件组件引用
    //         {
    //             name: '123', // 属性
    //         },
    //     );
    // },
    setup() {
        const state = reactive({
            name: 111,
        });

        setInterval(() => {
            state.name += 2;
        }, 200);

        // 直接返回一个函数，函数返回render
        return () => h('div', state.name);
    },
});

createApp(App).mount('#app');
```
