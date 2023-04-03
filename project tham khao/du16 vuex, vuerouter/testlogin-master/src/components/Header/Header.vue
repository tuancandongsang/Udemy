<template>
  <div class="header">
    <div class="header-menu">
      <span @click="showDrawer('menu')"><i class="fa-solid fa-bars"></i></span>
      <div class="drawer" v-if="drawer == 'menu'">
        <Drawer
          placement="left"
          :visible="visible"
          @handleClose="handleClose"
          title="Option Setting"
        >
          <template #headerMenu>
            <div class="drawer-logout" @click="handleLogOut">
              <Button content="Log Out" />
            </div>
          </template>
        </Drawer>
      </div>
    </div>
    <div class="header-noty">
      <div class="header-noty-filter">
        <Modal />
      </div>
      <div class="header-noty-bell">
        <span class="header-noty-bell-qty">1</span>
        <span @click="showDrawer('noti')">
          <i class="fa-solid fa-bell"></i
        ></span>
        <div class="drawer" v-if="drawer == 'noti'">
          <Drawer
            placement="right"
            :visible="visible"
            @handleClose="handleClose"
            title="Notify"
          >
            <template #headerNoti>
              <div class="drawer-logout">
                <Button content="Noti" />
              </div>
            </template>
          </Drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removetJwtToken } from '@/utils/helpers';
import Drawer from '@/components/Drawer.vue';
import Modal from '@/components/Modal.vue';
import './Header.scss';
import Button from '../Button/Button.vue';
export default {
  components: { Modal, Drawer, Button },
  data() {
    return {
      visible: false,
      drawer: '',
    };
  },
  methods: {
    handleLogOut() {
      removetJwtToken();
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    },
    showDrawer(text) {
      this.drawer = text;
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
  },
};
</script>
