<template>
    <div class="author-info">
        <div class="top"></div>
        <div class="bottom">
            <div class="author-name">{{ authorInfo.name }}</div>
            <div class="author-message">{{ authorInfo.message }}</div>
            <ul class="message">
                <li v-for="item of messageList" :key="item.name">
                    <div class="number">{{ item.number | bigNumber }}</div>
                    <div class="name">{{ item.name }}</div>
                </li>
            </ul>
            <ul class="icon">
                <li v-for="item of iconList" :key="item.name" @click="jumpToLink(item.link)">
                    <svg-icon :icon-class="item.svg" class="svg"></svg-icon>
                </li>
            </ul>
        </div>
        <div class="avatar"></div>
    </div>
</template>

<script>
// TODO svg点击增加一个跳转的连接
import SvgIcon from '../SvgIcon';
export default {
    components: {
        SvgIcon
    },
    filters: {
        bigNumber: (value) => {
            if (Number(value) > 1000) {
                value = (value / 1000).toFixed(2).replace(/[.]?0+$/, '') + 'k';
            }
            return value;
        }
    },
    data() {
        return {
            authorInfo: {
                name: 'Fantasy',
                message: '以下链接没一个可用的XD'
            },
            messageList: [
                {
                    name: '文章',
                    number: 9999
                },
                {
                    name: '访问量',
                    number: 9
                },
                {
                    name: '点赞数',
                    number: 9
                }
            ],
            iconList: [
                {
                    name: 'QQ',
                    svg: 'QQ',
                    link: '#'
                },
                {
                    name: '微信',
                    svg: 'weixin',
                    link: '#'
                },
                {
                    name: '微博',
                    svg: 'weibo',
                    link: '#'
                },
                {
                    name: '知乎',
                    svg: 'zhihu',
                    link: '#'
                },
                {
                    name: '推特',
                    svg: 'twitter',
                    link: '#'
                },
                {
                    name: 'steam',
                    svg: 'steam',
                    link: '#'
                },
                {
                    name: 'bilibili',
                    svg: 'bilibili',
                    link: '#'
                }
            ]
        };
    },
    methods: {
        jumpToLink(link) {
            if (link !== '#' && link) {
                window.open(link, '_blank');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
@import '@/assets/scss/shake.scss';
$totalHeight: 360px;
$topHeight: 120px;
$bottomHeight: $totalHeight - $topHeight;
$avatarHeight: 90px;
.author-info {
    height: $totalHeight;
    background-color: white;
    border-radius: 4px;
    .top {
        border-radius: 4px;
        background-color: $defaultColor;
        height: $topHeight;
    }
    .bottom {
        height: $bottomHeight;
        display: flex;
        flex-direction: column;
        margin-top: ($avatarHeight / 2) + 1;
        align-items: center;
        .author-name {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
        }
        .author-message {
            margin-top: 4px;
            font-size: 12px;
            color: #333;
        }
        .message {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            list-style: none;
            width: calc(100% - 40px);
            text-align: center;
            margin-top: 20px;
            .number {
                color: $defaultColor;
                font-size: 20px;
                font-weight: bold;
            }
            .name {
                font-size: 12px;
            }
        }
        .icon {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            list-style: none;
            width: calc(100% - 40px);
            margin-top: 30px;
            flex-wrap: wrap;
            .svg {
                width: 30px;
                height: 30px;
                @include shake();
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .avatar {
        height: $avatarHeight;
        width: $avatarHeight;
        border-radius: 50%;
        background: url('../../assets/image/15.png');
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #eee;
        position: absolute;
        top: $topHeight - ($avatarHeight / 2) - 1;
        left: 150 - ($avatarHeight / 2) - 1;
    }
}
</style>
