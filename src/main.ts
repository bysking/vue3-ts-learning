import { createApp, reactive, h, defineComponent } from 'vue';
// import { createApp, defineComponent, /*h, */ createVNode } from 'vue';
// import App from './App.vue';
import App from './App';

// const App = defineComponent({
//     // render() {
//     //     return createVNode(
//     //         'div', // 渲染节点： 标签名或者单文件组件引用
//     //         {
//     //             name: '123', // 属性
//     //         },
//     //     );
//     // },
//     setup() {
//         const state = reactive({
//             name: 111,
//         });

//         setInterval(() => {
//             state.name += 2;
//         }, 200);

//         return () => h('div', state.name);
//     },
// });

createApp(App).mount('#app');
