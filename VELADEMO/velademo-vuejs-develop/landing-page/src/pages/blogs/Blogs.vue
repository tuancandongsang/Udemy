<template>
  <div id="blog">
    <SlideShow />
    <div class="container">
      <div class="row mt-4 mb-4">
        <div class="col-12 col-sm-12 col-md-9">
          <ProductBlog />
        </div>
        <div class="col-12 col-sm-12 col-md-3">
          <SiderBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideShow from "@/components/slide-show/SlideShow.vue";
import ProductBlog from "@/components/product-blog/ProductBlog.vue";
import SiderBar from "@/components/sider-bar/SiderBar.vue";
import "./blogs.scss";

export default {
  components: {
    SlideShow,
    ProductBlog,
    SiderBar,
  },
};
</script>
