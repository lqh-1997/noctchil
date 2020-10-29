<template>
    <div>
        <div @click="removeInterval">{{ count }} -- {{ obj.time }}</div>
        <div>{{ arr }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUpdated, ref, reactive } from 'vue';
export default defineComponent({
    name: 'test1',
    setup() {
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

        return {
            count,
            obj,
            arr,
            removeInterval
        };
    }
});
</script>
