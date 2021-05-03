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

<style lang="less"></style>
