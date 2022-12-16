<template>
  <div>
    <div id="header">
      <div class="body">
        <div class="logo">
          <RouterLink to="/">
            <img src="../../assets/images/logo.png" alt="logo" />
          </RouterLink>
        </div>
        <button type="button" class="profile" @click="handleLogout">
          <p>Sign out</p>
        </button>
        <button type="button" class="btn-burger" v-on:click="handleVisibleMenu">
          <span>
            <img src="../../assets/images/menu-burger.png" alt="btn-burger" />
          </span>
        </button>
      </div>
    </div>
    <Drawer :isVisible="isVisible" class="menu-drawer" title="Menu Mobile" width="50%" placement="left"
      @handleClose="handleClose">
      <div id="menu-mobile">
        <div class="body">
          <div class="item">

            <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
              style="width: 100%; height: 87.5vh;" mode="inline" :theme="state.theme">
              <RouterLink to="/">
                <a-menu-item key="1">
                  <template #icon>
                    <reconciliation-outlined />
                  </template>
                  Product Manager
                </a-menu-item>
              </RouterLink>
              <RouterLink to="/blogs">
                <a-menu-item key="2">
                  <template #icon>
                    <highlight-outlined />
                  </template>
                  Blogs
                </a-menu-item>
              </RouterLink>
              <a-sub-menu key="sub1">
                <template #icon>
                  <AppstoreOutlined />
                </template>
                <template #title>Add status</template>
                <a-menu-item key="3">Option 1</a-menu-item>
                <a-menu-item key="4">Option 2</a-menu-item>
                <a-sub-menu key="sub1-2" title="Option 3">
                  <a-menu-item key="5">Option 3-1 </a-menu-item>
                  <a-menu-item key="6">Option 3-2</a-menu-item>
                </a-sub-menu>
              </a-sub-menu>
              <a-sub-menu key="sub2">
                <template #icon>
                  <SettingOutlined />
                </template>
                <template #title>Add status</template>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
                <a-menu-item key="9">Option 9</a-menu-item>
                <a-menu-item key="10">Option 10</a-menu-item>
              </a-sub-menu>
            </a-menu>

            <button type="button" class="profile" @click="handleLogout">
              <p>Sign out</p>
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script lang="ts">
import Drawer from "../../components/drawer/Drawer.vue";
import "./header.scss";
import { toastSuccess } from '@/utils/toast'
import {
  HighlightOutlined,
  ReconciliationOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuOutlined
} from '@ant-design/icons-vue';

export default {
  name: "Header",
  data() {
    return {
      isVisible: false,
      state: {
        selectedKeys: ['1'],
        openKeys: [],
      },
    };
  },
  methods: {
    handleVisibleMenu() {
      this.isVisible = true;
    },
    handleClose() {
      this.isVisible = false;
    },
    handleLogout() {
      this.$store.commit("LOGOUT");
      if (!this.$store.state.auth.isLogin) {
        this.$router.push("/login");
        toastSuccess('Logout Success')
      }
    },
  },
  components: {
    Drawer,
    ReconciliationOutlined,
    AppstoreOutlined,
    SettingOutlined,
    HighlightOutlined,
    MenuOutlined,
  },
};
</script>
