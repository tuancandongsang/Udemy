<template>
  <section class="py-10 register-recruit-component-label">
    <section>
      <v-container class="text-center ">
        <h1 class="section-title text-center">Nét đặc trưng tại BSSD</h1>
        <p>
          Với tiêu chí BSSD là môt gia đình nên môi trường làm việc tại BSSD vô cùng lành mạnh
          các cá nhân thỏa sức bộc phá bản thân, mọi thành viên của mái nhà BSSD sống và làm việc
          trên tinh thần giúp đỡ lẫn nhau cùng nhau cố gắng hoàn thiện bản thân xây dựng một tập thể
          lớn mạnh phát triển công ty vươn tầm thế giới .
        </p>
      </v-container>
    </section>
    <section>
      <v-container class="d-flex justify-center px-lg-16">
        <RegisterToApply/>
      </v-container>
    </section>

  </section>
</template>

<script>
import RegisterToApply from "@/components/RegisterToApply";

export default {
  components: {
    RegisterToApply
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

.register-recruit-component-label {
  background: #F3F3F3 !important;
}
</style>