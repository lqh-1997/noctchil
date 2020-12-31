<template>
    <div>
        <div @click="removeInterval">{{ count }} -- {{ obj.time }}</div>
        <div>{{ arr }}</div>
        <div>{{ c.data }}</div>
        <!-- 异步组件 挂起状态 实验性api -->
        <Suspense>
            <div>123</div>
        </Suspense>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onBeforeMount,
    onMounted,
    onUpdated,
    ref,
    reactive,
    getCurrentInstance
} from 'vue';
import mySetup from './setup';
export default defineComponent({
    name: 'test1',
    setup() {
        const internalInstance = getCurrentInstance();

        console.log(internalInstance!.appContext.config.globalProperties.foo);

        const count = ref<number>(0);
        const obj = reactive({
            time: new Date()
        });
        let arr = reactive<any>([]);

        const timer = setInterval(() => {
            // count.value++;
            obj.time = new Date();
        }, 1000);

        setTimeout(() => {
            arr = [4, 5, 6];
        }, 100);

        window.onload = () => {
            console.log('onload');
        };

        console.log('create');

        onMounted(() => {
            console.log('onMounted');
        });

        onBeforeMount(() => {
            console.log('onBeforeMounted');
        });

        onUpdated(() => {
            console.log('onUpdate');
        });

        function removeInterval() {
            clearInterval(timer);
        }

        const c = mySetup(1);

        return {
            c,
            count,
            obj,
            arr,
            removeInterval
        };
    }
});
</script>
