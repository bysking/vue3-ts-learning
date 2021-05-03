import { reactive, defineComponent } from 'vue';
import HelloWorld from './AppTest';

const renderTest = () => {
    return <div>测试函数组建</div>;
};

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
            return (
                <div>
                    <div>{state.name}</div>
                    {/* 会自动识别必传项 */}
                    <HelloWorld />
                    {renderTest()}
                </div>
            );
        };
    },
});
