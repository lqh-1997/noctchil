export const inputProps = {
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    disable: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String
    }
};

export const inputEmits = ['update:modelValue'];
