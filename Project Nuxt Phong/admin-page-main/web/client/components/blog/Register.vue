<template>
  <div class="blog-register bg-primary py-10 d-none d-md-block">
      <div class="section-title text-center size-32 white--text pb-5">
          ĐĂNG KÝ NHẬN BẢN TIN
      </div>
      <form-subcriber :rounded="false"/>
  </div>
</template>

<script>
import FormSubcriber from './FormSubcriber.vue';
export default {
    components: {
        FormSubcriber
    }
};
</script>

<style lang="scss" scoped>
</style>