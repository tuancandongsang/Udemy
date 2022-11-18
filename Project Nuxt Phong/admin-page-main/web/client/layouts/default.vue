<template>
  <v-app light>
    <v-container style="margin-bottom: 15px;">
      <v-toolbar
          style=" position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 7000;
          height:50px;
        "
          dense flat>
        <div
            style="display: flex;width: 90%;margin: auto;justify-content: space-between; align-items: center;height:48px;">
          <v-toolbar-title>
            <a href="/" class="app-logo d-flex align-center">
              <img class="img-logo" src="~assets/images/logo-mdo.svg" alt="Logo MDO 1"/>
              <span class="primary--text">mdo.com.vn</span>
            </a>
          </v-toolbar-title>
          <v-toolbar-items
              class="hidden-sm-and-down nav-item">
            <template v-for="(item, index) in menu">
              <v-menu
                  v-if="item.children"
                  :key="index"
                  transition="slide-y-transition"
                  :content-class="
                  item.children === 'MenuProduct'
                    ? 'list-solution'
                    : 'list-company'
                ">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      :class="isBtn(`${item.type}`) ? 'nav-item-btn' : ''"
                      text
                  >
                    <span>{{ item.title }}</span>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <menu-solution v-if="item.children === 'MenuProduct'"/>
                <menu-company v-else/>
              </v-menu>
              <v-btn
                  v-else
                  :key="index"
                  :id="isBtn(`${item.type}`) ? 'btn-menu-register' : ''"
                  :outlined="isBtn(`${item.type}`)"
                  :rounded="isBtn(`${item.type}`)"
                  :to="item.link"
                  :class="isBtn(`${item.type}`) ? 'nav-item-btn' : ''"
                  @click="menuClick(`${item.type}`)"
                  text>{{ item.title }}
              </v-btn>
            </template>
          </v-toolbar-items>
        </div>
        <!-- <v-spacer></v-spacer> -->

        <v-btn
            color="#12141d"
            class="hidden-md-and-up"
            icon
            @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer
          fixed
          v-model="drawer"
          class="hidden-md-and-up menu-mobile"
      >
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <template v-for="(item, index) in menu">
              <nuxt-link :to="item.link ? item.link : '/'" :key="index">
                <v-list-item
                    v-if="!item.children"
                    @click="menuClick(`${item.type}`, `${item.link}`)"
                    :id="isBtn(`${item.type}`) ? 'btn-menu-register' : ''"
                    :key="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-group v-else :key="index">
                  <template v-slot:activator>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </template>
                  <menu-solution-mobile
                      v-if="item.children === 'MenuProduct'"
                  />
                  <menu-company v-else/>
                </v-list-group>
              </nuxt-link>
            </template>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>
    <main>
      <Nuxt/>
      <dialog-register
          :showModel="isOpen"
          @close-dialog="setOpenDialogRegister(false)"
      />
      <base-goto-top>
        <v-btn fab color="primary"
        >
          <v-icon size="30" color="white">mdi-chevron-up</v-icon>
        </v-btn
        >
      </base-goto-top>
      <Footer/>
      <section id="call-for-ip">
        <div class="border">
          <a href="tel:0373958888" id="btn-call">
            <v-icon color="white">mdi-phone</v-icon>
          </a>
        </div>
      </section>
      <!-- Messenger Plugin chat Code -->
      <div id="fb-root"></div>
      <!-- Your Plugin chat code -->
      <div id="fb-customer-chat" class="fb-customerchat">
      </div>
      <script>
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute('page_id', '100419876029007');
        chatbox.setAttribute('attribution', 'biz_inbox');
      </script>
      <!-- Your SDK code -->
      <script>
        window.fbAsyncInit = function () {
          FB.init({
            xfbml: true,
            version: 'v14.0'
          });
        };
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      </script>
    </main>
  </v-app>
</template>

<script>
import Footer from '../components/Footer.vue';
import MenuSolution from '../components/MenuSolution.vue';
import MenuSolutionMobile from '../components/MenuSolutionMobile.vue';
import MenuCompany from '../components/MenuCompany.vue';
import {localize} from 'vee-validate';
import DialogRegister from '../components/DialogRegister.vue';
import {mapMutations} from 'vuex';
export default {
  components: {
    Footer,
    MenuSolution,
    MenuCompany,
    MenuSolutionMobile,
    DialogRegister
  },
  data() {
    return {
      title: 'MDO',
      lang: 'vn',
      changeLang: '',
      drawer: false,
      group: null,
      showDialogRegister: true,
      menu: [
        {icon: 'home', title: 'Trang chủ', type: 'Link', link: '/'},
        {
          icon: 'info',
          title: 'Giải pháp',
          type: 'Link',
          children: 'MenuProduct'
        },
        // { icon: "warning", title: "Bảng giá", type: "Link", link: "/" },
        {
          icon: 'warning',
          title: 'Công ty',
          type: 'Link',
          children: 'MenuCompany'
        },
        {icon: 'warning', title: 'Báo chí', type: 'Link', link: '/bao-chi'},
        {icon: 'warning', title: 'Blog', type: 'Link', link: '/blog'},
        {icon: 'warning', title: 'Đăng ký', type: 'Btn'}
      ]
    };
  },
  computed: {
    // isOpen() {
    //   return this.$store.state.register.openDialogRegister;
    // }
  },
  watch: {
    openDialogRegister() {
      this.showDialogRegister = this.openDialogRegister;
    },
    lang() {
      localize(this.lang);
    },
    group() {
      // this.drawer = false;
    }
  },
  mounted() {
    // let storageLang = this.$store.state.localStorage.language;
    // if (storageLang) {
    //   this.$i18n.setLocale(storageLang);
    //   this.lang = this.$i18n.locale;
    // } else {
    //   this.$store.commit('localStorage/changeLanguage', this.$i18n.locale);
    // }
    // this.initOmiLib(
    //   "https://omni.vanphongso.org/assets/js/IpccChat.js",
    //   function () {
    //     var IpccChat = {
    //       domain: "VPS_CHAT",
    //       username: "",
    //       url: "https://omni.vanphongso.org",
    //     };
    //     embedIpccChat(IpccChat);
    //   }
    // );
  },
  methods: {
    ...mapMutations({
      setOpenDialogRegister: 'register/setOpenDialogRegister'
    }),
    isBtn(type) {
      return type === 'Btn';
    },
    menuClick(type, link) {
      if (this.isBtn(type)) {
        // this.gotoRegister();
        this.setOpenDialogRegister(true);
      } else {
        if (link) {
          window.location.href = link;
        }
      }
    },
    menuItems() {
      return this.menu;
    },
    gotoCompany() {
      const el = document.getElementById('companyBox');
      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    },
    gotoRegister() {
      const el = document.getElementById('register');
      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    },
    setLang(language) {
      this.$i18n.setLocale(language);
      this.$store.commit('localStorage/changeLanguage', language);
      this.lang = language;
    }
    // initOmiLib(src, callback) {
    //   var s = document.createElement("script");
    //   s.type = "text/javascript";
    //   s.src = src;
    //   s.addEventListener(
    //     "load",
    //     function (e) {
    //       callback(null, e);
    //     },
    //     false
    //   );
    //   var head = document.getElementsByTagName("head")[0];
    //   head.appendChild(s);
    // },
  }
};
</script>
<style>
#ipcc_chat_iframe {
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
  0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
}

</style>
