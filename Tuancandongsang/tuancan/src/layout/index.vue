<template>
    <div>
        <!-- hiển thị menu sidebar bên trái  -->
        <sidebar class="sidebar" />
        <!-- hiển thị cả màn hình bên phải -->
        <div>
            <div>
                <!-- hiển thị thanh nav bên trên  -->
                <navbar />
                <!-- hiển thị thanh bảng trọn bên dưới  -->
                <tagsview />
                <!-- <h1>tags-view</h1> -->
            </div>
            <!-- hiển thị app bên dưới  -->
            <appmain />
            <!-- hiển thị cài đặt -->
            <settings />
        </div>
    </div>
</template>

<script>
import { appmain, settings, navbar, tagsview, sidebar } from './components/index'
export default {
    name: 'Layout',
    components: { appmain, settings, navbar, tagsview, sidebar }

}
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
.sidebar{
    @include btn;
    color: aqua;

}
</style>