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
      <register />
    </section>
  </v-dialog>
</template>

<script>
import Register from "./RegisterDialog.vue";
export default {
  components: { Register },
  props: {
    showModel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>