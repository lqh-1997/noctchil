import { ref } from 'vue';

export default function toggleUI() {
    const action = ref<'login' | 'signup'>('login');
    const sliderClass = ref<'bounceLeft' | 'bounceRight'>('bounceLeft');
    const toggleAction = function () {
        if (action.value === 'login') {
            action.value = 'signup';
            sliderClass.value = 'bounceRight';
        } else {
            action.value = 'login';
            sliderClass.value = 'bounceLeft';
        }
    };

    return {
        action,
        toggleAction,
        sliderClass
    };
}
