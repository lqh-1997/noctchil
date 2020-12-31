import { defineComponent, getCurrentInstance, ref } from 'vue';

export default function useWhatever(a: any) {
    const data = ref('hello there');
    const myA = a;

    console.log(data.value);

    return {
        data,
        myA
    };
}
