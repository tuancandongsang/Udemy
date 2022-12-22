<template>
  <div  :class="{ sidebarWidth : hinden }">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed"  >
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-switch :checked="theme === 'dark'" checked-children="Dark" un-checked-children="Light" @change="changeTheme" />
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" :inline-collapsed="state.collapsed"
      :theme="theme">
     <sidebarItem v-for="route in router" :key="route.path" :item="route" :basePath="route.path" />
    </a-menu>
  </div>
</template>
<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import {mapGetters, mapMutations} from 'vuex'
import sidebarItem from './sidebarItem.vue'
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    sidebarItem
  },
  data() {
    return {
      state: {
        collapsed: false,
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
        theme: 'dark',
      },
    }
  },
  methods:{
    ...mapMutations(['SET_ROUTES', 'TONGGLE_HINDEN']),
     toggleCollapsed  () {
      this.TONGGLE_HINDEN(this.hindenSibebar)
      console.log(this.hindenSibebar);
      this.state.collapsed = !this.state.collapsed;
      this.state.openKeys = this.state.collapsed ? [] : this.state.preOpenKeys;
    },
    
     changeTheme (checked) {
      this.state.theme = checked ? 'dark' : 'light';
    }
  },
  created(){
    this.SET_ROUTES()
    console.log(this.hindenSibebar);
  },
  computed:{...mapGetters(['router', "hindenSibebar"]),
  hinden (){
    return this.hindenSibebar
  }
}



}
</script>
<style scoped>
.sidebarWidth{
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