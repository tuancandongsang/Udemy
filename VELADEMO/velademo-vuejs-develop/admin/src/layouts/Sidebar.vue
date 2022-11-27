<template>
  <div id="menu">
    <div class="menu-destop">
      <a-switch  v-model:checked="isLight"  checked-children="Dark" class="menu-destop-switch" 
      @change="changeTheme"
      un-checked-children="Light"  />
      <a-menu 
      :theme="theme"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      style="width: 256px; height: 87.5vh;"
      >
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
    </div>
  </div>
</template>


<script>
import {
  HighlightOutlined,
  ReconciliationOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuOutlined
} from '@ant-design/icons-vue';
import './sidebar.scss'
import Drawer from "../components/drawer/Drawer.vue";


const check =  localStorage.getItem('themes')
export default {
  components: {
    ReconciliationOutlined,
    AppstoreOutlined,
    SettingOutlined,
    HighlightOutlined,
    MenuOutlined,
    Drawer
  },
  data() {
    return {
      light : 'light',
      dark : 'dark',
      isLight : null,
   
      state: {
        theme: 'dark',
        selectedKeys: [],
        openKeys: [],
      },
    }
  },
  mounted(){
   if(check === 'true'){
    this.isLight = true
   }else{
    this.isLight  = false
   }
  },
  watch :{
    isLight(){
      this.state.theme = this.isLight ? "dark" :  'light';
      localStorage.setItem('themes',this.isLight)
    },
  },
  computed: {
    theme(){
      return this.isLight  ? 'dark' : 'light'
    }
  },
  methods: {
    setTheme(){
      localStorage.setItem('themes' , this.isLight)
    },

     changeTheme  (checked) {
      console.log('tuan', checked);
      this.state.theme = checked ? 'dark' : 'light';

    },
  }
};
</script>
<style scoped>
.dark-light-mode {
  position: absolute;
  top: -28px;
}
</style>

