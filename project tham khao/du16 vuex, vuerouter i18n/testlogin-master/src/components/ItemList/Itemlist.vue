<template>
  <div>
    <div class="itemlist" v-for="data in datas" :key="data.id">
      <div class="itemlist-avatar">{{ avatar }}</div>
      <div class="itemlist-infor">
        <h3>{{ data?.name }}</h3>
        <p>{{ data?.time }}</p>
        <p>{{ data?.presentStatus }}</p>
      </div>
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
    datas: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      if (this.datas?.value) {
        return `PRO`;
      }
      return `SYT`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.itemlist {
  @include flexBetween;
  align-items: center;
  height: 20%;
  border-top: 1px solid $bg-border;

  &:first-child {
    border-top: none;
  }

  &-avatar {
    width: 30px;
  }

  &-infor {
    flex-grow: 1;
    margin-left: 4px;
  }
}
</style>
