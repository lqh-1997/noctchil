export const state = () => ({
    a: 123
});

export const getters = () => ({
    getA: (state) => {
        return state.a;
    }
});
