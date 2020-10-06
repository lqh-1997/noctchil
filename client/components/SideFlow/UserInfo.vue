<template>
    <div v-if="isLogin" class="is-login">
        <div class="side-avatar"></div>
        <div class="side-button">
            <el-button>注销登录</el-button>
            <el-button>个人中心</el-button>
            <el-button>啊啊啊啊</el-button>
            <el-button>啊啊啊啊</el-button>
        </div>
    </div>
    <div v-else class="is-not-login">
        <div class="side-main">
            <div class="side-main-avatar" @click="toLogin"></div>
            <div class="side-main-text">点击头像进行登录</div>
        </div>
        <div class="side-main2"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            isLogin: false
        };
    },
    methods: {
        toLogin() {
            this.$router.push('/login');
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    watch: {
        getUserId(data) {
            this.isLogin = !!data;
        }
    },
    mounted() {
        this.isLogin = !!this.$store.state.userId;
    }
};
</script>

<style lang="scss" scoped>
.is-login {
    height: 200px;
    .side-avatar {
        margin-top: 10px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background: url('../../assets/image/15.png');
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #eee;
        margin: 0 auto;
    }
    .side-button {
        padding: 50px 10px 10px 10px;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
        background-image: radial-gradient(
            circle at 50% 0,
            transparent,
            transparent 45px,
            #fff 30px
        );
        top: -42px;
        z-index: 20;
        border-radius: 4px;
        &/deep/ .el-button {
            margin-left: 10px;
        }
    }
}

.is-not-login {
    height: 220px;
    .side-main {
        height: 220px;
        border-radius: 4px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .side-main-avatar {
        margin-top: 40px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background: url('../../assets/image/15.png');
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #eee;
        &:hover {
            transform: rotate(666turn);
            transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 1s;
        }
    }
    .side-main-text {
        margin-top: 20px;
    }
}
</style>
