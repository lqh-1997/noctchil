import { defineComponent, ref, unref, computed } from 'vue';

export default defineComponent({
    name: 'test2',
    setup() {
        const count = ref(1);
        const count2 = ref(0);

        const addComputed = computed(() => {
            return count.value + count2.value;
        });

        return () => {
            return (
                <>
                    <div onClick={() => count.value++}>{unref(count)}</div>
                    <div onClick={() => count2.value++}>{unref(count2)}</div>
                    <div>{unref(addComputed)}</div>
                </>
            );
        };
    }
});
