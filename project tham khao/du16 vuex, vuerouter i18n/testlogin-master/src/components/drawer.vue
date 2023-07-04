<template>
  <a-drawer
    :title="title"
    :placement="placement"
    :closable="false"
    width="60%"
    height="100%"
    :visible="visible"
    @close="() => $emit('handleClose')"
  >
    <slot name="headerMenu"></slot>
    <slot name="headerNoti"></slot>
  </a-drawer>
</template>
<script>
export default {
  props: {
    placement: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    title: String,
  },
};
</script>
<style lang="scss" scoped>
</style>