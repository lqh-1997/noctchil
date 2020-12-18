<template>
    <div class="text-area-effect">
        <textarea
            :class="inputClass"
            placeholder=""
            @focus="handleFocus"
            @input="handleInput"
            @blur="handleBlur"
            @keydown.tab="handleKeyDown"
            v-model="currentValue"
        />
        <label>{{ text }}</label>
        <span class="focus-border">
            <i></i>
        </span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
export default defineComponent({
    props: {
        value: {
            type: [String, Number] as PropType<number | string>,
            default: null
        },
        text: {
            type: String as PropType<string>,
            default: '输入框'
        }
    },
    emits: ['focus', 'input', 'blur', 'keydown', 'update:value'],
    setup(props, { emit }) {
        const currentValue = ref(props.value);

        // 如果输入框有值就添加className 'has-content'
        const inputClass = computed(() => {
            if (props.value) {
                return 'effect has-content';
            } else {
                return 'effect';
            }
        });

        function handleFocus(e: InputEvent) {
            emit('focus', e);
        }

        function handleInput(e: InputEvent) {
            const value = (<HTMLTextAreaElement>e.target).value;
            // 更新子组件的value
            emit('update:value', value);
            emit('input', e);
        }

        function handleBlur(e: InputEvent) {
            emit('blur', e);
        }

        function handleKeyDown(e: KeyboardEvent) {
            emit('keydown', e);
        }

        watchEffect(() => {
            currentValue.value = props.value;
        });

        return {
            handleFocus,
            handleInput,
            handleBlur,
            handleKeyDown,
            inputClass,
            currentValue
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
.text-area-effect {
    width: 100%;
    position: relative;
    :focus {
        outline: none;
    }
    textarea {
        display: block;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        width: 100%;
        box-sizing: border-box;
        letter-spacing: 1px;
        border: 1px solid rgb(217, 217, 217);
        border-radius: 2px;
        padding: 2px 0 2px 10px;
    }
    .effect ~ .focus-border:before,
    .effect ~ .focus-border:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $defaultColor;
        transition: 0.3s;
    }
    .effect ~ .focus-border:after {
        top: auto;
        bottom: 0;
        left: auto;
        right: 0;
    }
    .effect ~ .focus-border i:before,
    .effect ~ .focus-border i:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 0;
        background-color: $defaultColor;
        transition: 0.4s;
    }
    .effect ~ .focus-border i:after {
        left: auto;
        right: 0;
        top: auto;
        bottom: 0;
    }
    .effect:focus ~ .focus-border:before,
    .effect:focus ~ .focus-border:after,
    .has-content.effect ~ .focus-border:before,
    .has-content.effect ~ .focus-border:after {
        width: 100%;
        transition: 0.3s;
    }
    .effect:focus ~ .focus-border i:before,
    .effect:focus ~ .focus-border i:after,
    .has-content.effect ~ .focus-border i:before,
    .has-content.effect ~ .focus-border i:after {
        height: 100%;
        transition: 0.4s;
    }
    .effect ~ label {
        position: absolute;
        left: 10px;
        width: 100%;
        top: 8px;
        color: #aaa;
        transition: 0.3s;
        z-index: 1;
        letter-spacing: 0.5px;
        pointer-events: none;
    }
    .effect:focus ~ label,
    .has-content.effect ~ label {
        top: -18px;
        left: 0;
        font-size: 12px;
        color: $defaultColor;
        transition: 0.3s;
    }
}
</style>
