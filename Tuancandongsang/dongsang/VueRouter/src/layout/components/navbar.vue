<template>
  <div class="navbar">
    <div> <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="state.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button></div>
    <div>
      <h1>navbar</h1>
    </div>
  </div>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    MenuFoldOutlined, MenuUnfoldOutlined
  },
  methods: {
    ...mapMutations(['SET_ROUTES', 'HANDLE_SIDEBAR']),
    toggleCollapsed() {
      this.state.collapsed = !this.state.collapsed;
      this.state.openKeys = this.state.collapsed ? [] : this.state.preOpenKeys;
    },
  },
  computed: {
    ...mapGetters(["state"]),
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
}
</style>