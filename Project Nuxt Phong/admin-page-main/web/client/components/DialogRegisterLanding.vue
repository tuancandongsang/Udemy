<template>
  <v-dialog
      v-model="showModel"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <section class="wrap-dialog-register">
      <v-btn icon color="primary" class="btn-close" @click="closeDialog">
        <v-icon size="30">mdi-close</v-icon>
      </v-btn>
      <register-landing/>
    </section>
  </v-dialog>
</template>

<script>
import RegisterLanding from './RegisterDialogLanding.vue';

export default {
  components: {RegisterLanding},
  props: {
    showModel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
