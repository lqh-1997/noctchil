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
        <div class="side-main-up"></div>
        <div class="side-main-down">点击头像进行登录</div>
        <div class="side-avatar" @click="toLogin"></div>
        <div class="side-main"></div>
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
    .side-main-up {
        height: 100px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background-color: white;
    }
    .side-main-down {
        height: 120px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: white;
        line-height: 120px;
        text-align: center;
    }
    .side-avatar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background: url('../../assets/image/15.png');
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #eee;
    }
}
</style>
