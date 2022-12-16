<template>
   <v-btn class="btn-contact" id="btn-register-now" data-aos="zoom-in-up" @click="setOpenDialogRegister(true)">
     Đăng ký ngay
     <span class="shadow shadow-white"></span>
   </v-btn>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  methods: {
    ...mapMutations({
      setOpenDialogRegister: "register/setOpenDialogRegister",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>