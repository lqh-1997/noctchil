import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 控制slider左右滑动的逻辑部分
export default function toggleUI() {
    const router = useRouter();
    const route = useRoute();

    // 获取query 如果不包含的话默认为login
    const query = route.query.action === 'signUp' ? 'signUp' : 'login';
    const bounce = route.query.action === 'signUp' ? 'bounceLeft' : 'bounceRight';

    // 滑块处于左边为注册 右边为登录
    const action = ref<'login' | 'signUp'>(query);
    const sliderClass = ref<'bounceLeft' | 'bounceRight'>(bounce);
    const toggleAction = function () {
        if (action.value === 'login') {
            action.value = 'signUp';
            sliderClass.value = 'bounceLeft';
        } else {
            action.value = 'login';
            sliderClass.value = 'bounceRight';
        }
        router.push({
            path: route.path,
            query: {
                action: action.value
            }
        });
    };

    return {
        action,
        toggleAction,
        sliderClass
    };
}
