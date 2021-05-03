import { defineComponent, reactive, ref, computed, watchEffect } from 'vue';

const propType = {
    msg: {
        type: String,
        required: true,
    },
    type: String,
} as const;

export default defineComponent({
    name: 'App',
    props: propType,
    components: {},
    // 只会在组件初始化的时候执行一次
    setup() {
        return () => {
            return <div>111</div>;
        };
    },
});
