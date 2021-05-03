import { reactive, defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const state = reactive({
            name: 55555555555555555,
        });

        setInterval(() => {
            state.name += 2;
        }, 200);

        return () => {
            // jsx语法, 类似直接写template模版
            return <div>{state.name}</div>;
        };
    },
});
