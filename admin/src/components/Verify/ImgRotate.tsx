import { defineComponent, ref, reactive, watch, computed, unref, getCurrentInstance } from 'vue';
import { rotateProps } from './props';

export default defineComponent({
    name: 'imgRotateDragVerify',
    inheritAttrs: false,
    props: rotateProps,
    // TODO 这里放的似乎是emit的类型
    emits: ['success', 'change', 'update:value'],
    setup(props, { emit, attrs }) {
        const basicRef = ref<any>(null);
        const state = reactive({
            showTip: false,
            // 成功旋转
            isPassing: false,
            imgStyle: {},
            randomRotate: 0,
            currentRotate: 0,
            toOrigin: false,
            startTime: 0,
            endTime: 0,
            dragged: false
        });

        watch(
            () => state.isPassing,
            (isPassing) => {
                if (isPassing) {
                    const { startTime, endTime } = state;
                    const time = (endTime - startTime) / 1000;
                    emit('success', { isPassing, time: time.toFixed(1) });
                    emit('change', isPassing);
                    emit('update:value', isPassing);
                }
            }
        );

        const getImgWrapStyleRef = computed(() => {
            const { imgWrapStyle, imgWidth } = props;
            return {
                width: `${imgWidth}px`,
                height: `${imgWidth}px`,
                ...imgWrapStyle
            };
        });

        function handleImgOnLoad() {
            const { minDegree, maxDegree } = props;
            const ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree));
            state.randomRotate = ranRotate;
            state.imgStyle = {
                transform: `rotateZ(${ranRotate}deg)`
            };
        }

        function resume() {
            state.showTip = false;
            const basicEl = unref(basicRef);
            if (!basicEl) {
                return;
            }
            state.isPassing = false;

            basicEl.$.resume();
            handleImgOnLoad();
        }

        const instance = getCurrentInstance as any;
        if (instance) {
            instance.resume = resume;
        }

        return () => {
            const { src } = props;
            const { toOrigin, isPassing, startTime, endTime } = state;
            const imgCls: string[] = [];
            if (toOrigin) {
                imgCls.push('to-origin');
            }
            const time = (endTime - startTime) / 1000;

            return (
                <div>
                    <div style={unref(getImgWrapStyleRef)}>
                        <img
                            src={src}
                            onLoad={handleImgOnLoad}
                            width={parseInt(props.width as string)}
                            class={imgCls}
                            style={state.imgStyle}
                            onClick={() => {
                                resume();
                            }}
                        />
                        {state.showTip && (
                            <span class={[`ir-dv-img__tip`, state.isPassing ? 'success' : 'error']}>
                                {state.isPassing
                                    ? `校验成功,耗时${time.toFixed(1)}秒！`
                                    : '验证失败！'}
                            </span>
                        )}
                        {!state.showTip && !state.dragged && (
                            <span class={[`ir-dv-img__tip`, 'normal']}>点击图片可刷新</span>
                        )}
                    </div>
                </div>
            );
        };
    }
});
