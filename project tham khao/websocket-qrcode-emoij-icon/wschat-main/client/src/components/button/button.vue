<template>
  <div id="button">{{content}}</div>
</template>

<script>
export default {
    props:["content"]
};
</script>

<style lang="scss" scoped>
#button {
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 12px 20px;
  min-width: 100px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(27, 216, 207, 0.2) 0px 7px 29px 0px;
    background-color: rgba(27, 216, 207, 0.2);
  }
}
</style>