<template>
  <a-input-search
    placeholder="input search text"
    style="width: 70%"
    @search="onSearch"
  />
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>
