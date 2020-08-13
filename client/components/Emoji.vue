<template>
    <el-popover placement="top" width="300" trigger="hover" :visible-arrow="false">
        <ul class="emojiList"></ul>
        <el-button slot="reference" size="mini" plain>表情包</el-button>
    </el-popover>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.emojiList {
    width: 100%;
    height: 200px;
}
</style>
