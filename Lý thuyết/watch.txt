<!--
type="text"
placeholder="text"
 -->

<template>
  <a-input
    class="Input"
    v-model:value="value"
    :placeholder="placeholder"
    :type="type"
  />
</template>
  <script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },

  },

  data() {
    return {
      value: ''
    };
  },
  watch: {
    value() {
      this.$emit('value-input', this.value)
    }
  },
  methods: {},
};
</script>
<style scoped>
.Input {
  border-radius: 8px;
}
</style>