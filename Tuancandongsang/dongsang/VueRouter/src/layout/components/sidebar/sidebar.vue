<template>
  <div :class="hinden ? 'sidebarWidth' : ''">
    <a-switch :checked="theme === 'dark'" checked-children="Dark" un-checked-children="Light" @change="changeTheme" />
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline"
      :inline-collapsed="state.collapsed" :theme="theme">
      <sidebarItem v-for="route in router" :key="route.path" :item="route" :basePath="route.path" />
    </a-menu>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import sidebarItem from './sidebarItem.vue'
export default {
  components: {
    sidebarItem
  },
  methods: {
    ...mapMutations(['SET_ROUTES', 'HANDLE_SIDEBAR']),
    toggleCollapsed() {
      this.state.collapsed = !this.state.collapsed;
      this.state.openKeys = this.state.collapsed ? [] : this.state.preOpenKeys;
    },
    changeTheme(checked) {
      this.state.theme = checked ? 'dark' : 'light';
    }
  },
  created() {
    this.SET_ROUTES()
    console.log(this.state);
  },
  computed: {
    ...mapGetters(['router', "state"]),
    hinden() {
      return !this.state.collapsed
    }
  }
}
</script>
<style scoped>
.sidebarWidth {
  width: 256px;
}
</style>

<!-- // setup() {
  //   const state = reactive({
  //     collapsed: false,
  //     selectedKeys: ['1'],
  //     openKeys: ['sub1'],
  //     preOpenKeys: ['sub1'],
  //     theme: 'dark',
  //   });
  //   watch(() => state.openKeys, (_val, oldVal) => {
  //     state.preOpenKeys = oldVal;
  //   });
  //   const toggleCollapsed = () => {
  //     state.collapsed = !state.collapsed;
  //     state.openKeys = state.collapsed ? [] : state.preOpenKeys;
  //   };
  //   const changeTheme = checked => {
  //     state.theme = checked ? 'dark' : 'light';
  //   };
  //   return {
  //     ...toRefs(state),
  //     toggleCollapsed,
  //     changeTheme,
  //   };
  // }, -->