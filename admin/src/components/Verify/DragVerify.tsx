import { defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import { basicProps } from './props';

defineComponent({
    name: 'BaseDragVerify',
    props: basicProps,
    emits: ['success', 'update:value', 'change', 'start', 'move', 'end'],
    setup(props, { emit, slots }) {
        const state = reactive({
            isMoving: false,
            isPassing: false,
            moveDistance: 0,
            toLeft: false,
            startTime: 0,
            endTime: 0
        });

        const wrapElRef = ref<HTMLDivElement | null>(null);
        const barElRef = ref<HTMLDivElement | null>(null);
        const contentElRef = ref<HTMLDivElement | null>(null);
        const actionElRef = ref<HTMLDivElement | null>(null);

        watch(
            () => state.isPassing,
            (isPassing) => {
                if (isPassing) {
                    const { startTime, endTime } = state;
                    const time = (endTime - startTime) / 1000;
                    emit('success', { isPassing, time: time.toFixed(1) });
                    emit('update:value', isPassing);
                    emit('change', isPassing);
                }
            }
        );

        // TODO 立即执行一次
        watchEffect(() => {
            state.isPassing = !!props.value;
        });
    }
});
