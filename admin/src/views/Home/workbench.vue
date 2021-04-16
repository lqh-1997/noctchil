<template>
    <div class="home">
        <div class="tips">
            <title>Welcome</title>
            <article>
                这里是Fantasy!<br />
                这里暂时什么功能都没有, 以后也可能什么都没有!!<br />
                所以说凑合一下, 就酱, byeBye!!!
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'workbench',
    setup() {}
});
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tips {
        margin-top: 30px;
        height: 300px;
        width: 80%;
        background: linear-gradient(to right, #8975fb 0%, #746be7 35%), #6f4ceb;
        border-radius: 20px;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 30px;
        title {
            display: block;
            font-size: 24px;
            font-weight: 600;
        }
        article {
            font-size: 16px;
            margin-top: 8px;
        }
    }
}
</style>
