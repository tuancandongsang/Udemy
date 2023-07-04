<template>
  <div class="itemlist">
    <div class="itemlist-container">
      <p>{{ avatar }}</p>
      <p>{{ data?.name }}</p>
      <p>{{ data?.time }}</p>
      <p>{{ data?.previousState }}</p>
      <p>{{ data?.presentStatus }}</p>
      <p>{{ data?.presentValue }}</p>
      <div>
        <router-link :to="`/${data?.id}`"
          >Detail <i class="fa-solid fa-arrow-right"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      if (this.data?.value == 'process') {
        return `pro`;
      }
      return `SYT`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/index.scss';

.itemlist {
  height: 20%;
  border-top: 1px solid $bg-border;

  &:first-child {
    border-top: none;
  }

  &-container {
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
    height: 100%;
    font-size: 0.8rem;
    align-items: center;
    font-family: 'Courier New', Courier, monospace;
  }
}
</style>