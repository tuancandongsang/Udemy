<template>
  <div id="input">
    <input
      class="input"
      v-model="value"
      type="text"
      id="url"
      :placeholder="placeholder"
      @input="debounceSearch"
      />
  </div>
</template>

<script>
export default {
    props:["placeholder"],
  data() {
    return {
      value: "",
    };
  },
  methods:{
    debounceSearch(){
        this.$emit('debounceSearch', this.value)
    }
  }
};
</script>

<style scoped lang="scss">
#input {
    width: 100%;
  .input {
    padding: 12px 20px;
    margin: 0;
    min-width: 150px;
    border-radius: 8px;
    width: 100%;  
    background-color: #fff;
    color: #000;
    font-size: 16px;
}

}
</style>