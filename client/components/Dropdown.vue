<template>
    <div class="dropdown-panel">
        <ul class="dropdown-first">
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scope>
.dropdown-panel {
    position: absolute;
    background: white;
    .dropdown-first {
        width: 100px;
        list-style: none;
        li {
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>
