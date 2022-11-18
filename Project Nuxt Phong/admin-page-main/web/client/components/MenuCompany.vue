<template>
  <v-list flat>
    <v-list-item-group>
      <nuxt-link v-for="(item, i) in items" :key="i" :to="item.link">
        <v-list-item>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-office-building-outline",
          link: "/ve-chung-toi",
          title: "Về chúng tôi  ",
        },
        {
          icon: "mdi-alert-circle-outline",
          link: "/dieu-khoan",
          title: "Điều khoản",
        },
        {
          icon: "mdi-bullhorn-variant-outline",
          link: "/tuyen-dung",
          title: "Tuyển dụng",
        },
        {
          icon: "mdi-phone-in-talk-outline",
          link: "/lien-he",
          title: "Liên hệ",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>