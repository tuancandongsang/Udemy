<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target="_blank" href="image.png">bui thanh hoa</a>
    <a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/">Nguyen anh tuan</a>
    <a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">nguyen phuong nga</a>
    <a class="document-btn" target="_blank" href="https://panjiachen.gitee.io/vue-element-admin-site/zh/">bui phuong thao</a>
    <dropdown-menu class="document-btn" :items="articleList" title="tuancandongsang" />
    <a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/job/">Dong Sang</a>
  </div>
</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: 'bui thanh hoa', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'nguyen phuong nga', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'bui thi thao', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'bui thi van', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'bui van luan', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'nguyen van toan', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'tran thi hang', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'nguyen dac danh', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' },
        { title: 'nguyen hong nhung', href: 'https://hatvan.vn/wp-content/uploads/2019/11/FB_IMG_1574061582582.jpg' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
