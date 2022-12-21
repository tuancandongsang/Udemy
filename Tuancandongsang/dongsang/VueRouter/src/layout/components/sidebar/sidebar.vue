<template>
  <div style="width: 256px">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-switch
      :checked="theme === 'dark'"
      checked-children="Dark"
      un-checked-children="Light"
      @change="changeTheme"
    />
    <!-- theme="dark" -->
    <a-menu
      :theme="theme"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
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
    };
  },
  methods: {
    changeTheme(checked) {
      this.state.theme = checked ? 'dark' : 'light';
    },
    toggleCollapsed() {
      this.state.collapsed = !this.state.collapsed;
      this.state.openKeys = this.state.collapsed ? [] : this.state.preOpenKeys;
    },
  },
  watch: {},

  // watch () (
  //   () => state.openKeys,
  //   (_val, oldVal) => {
  //     state.preOpenKeys = oldVal;
  //   }
  // )
};
</script>