<template>
    <div class="hello">子组件{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, h } from 'vue';

let propType = {
    msg: {
        type: Number,
        required: true,
    },
} as const;

export default defineComponent({
    name: 'HelloWorld',
    props: propType,

    setup() {
        const state = reactive({
            name: 111,
        });

        setInterval(() => {
            state.name += 2;
        }, 200);

        return h('div', state.name);
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
