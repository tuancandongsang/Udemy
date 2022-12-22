<template>
  <div>
    <a-menu-item v-if="children" :key="item.path">
      <router-link :to="item.path"> <span>{{ item.children[0].meta.title }}</span></router-link>
    </a-menu-item>

    <a-sub-menu v-else>
      <template #title>{{ item.meta.title }}</template>
      <a-menu-item v-for="child in item.children" :key="child.path"><router-link :to="basePath + `/` + child.path">{{
          child.meta.title
      }}</router-link></a-menu-item>
    </a-sub-menu>

  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  computed: {
    children() {
      if (this.item.children.length == 1 || !this.item.children) {
        return true
      }
      return false
    }
  },
  created() {
    console.log();
  }
}
</script>

<style>

</style>>