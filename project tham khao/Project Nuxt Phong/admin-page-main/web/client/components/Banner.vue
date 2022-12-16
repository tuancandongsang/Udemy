<template>
  <section id="banner">
    <v-parallax dark :src="require('@/assets/images/' + banner  )" height="640" :alt="altSTr">
      <v-container>
        <div
            class="
            banner-content
            text-center
            d-flex
            justify-center
            align-center
            flex-column
          "
        >
          <h1
              data-aos="fade-in"
              class="banner-title text-center"
              v-html="$t(title)"
          />
          <h2
              class="banner-intro text-center"
              data-aos="fade-up"
              v-html="$t(subtitle)"
          ></h2>
          <div class="py-5" v-if="showBtn">
            <v-btn
                class="btn-register btn-header mr-0 mb-4 mb-md-0 mr-md-8"
                data-aos="fade-in"
                @click="gotoRegister"
                id="btn-banner-register"
            >
              {{ $t('labels.register') }}
              <span class="shadow"></span>
            </v-btn>
            <v-btn
                class="btn-contact btn-header mb-4 mb-md-0"
                data-aos="fade-in"
                id="btn-banner-contact"
                @click="gotoRegister"
            >{{ $t('labels.contact') }}
              <span class="shadow shadow-white"></span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-parallax>
  </section>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 'Banner',
  props: {
    title: {
      type: String,
      default: 'homePage.banner.title'
    },
    subtitle: {
      type: String,
      default: 'homePage.banner.subtitle'
    },
    banner: {
      type: String,
      default: 'banner.png'
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    altSTr: {
      type: String,
      default: 'homePage.banner.altStr'
    }
  },
  mounted() {
  },
  computed: {
    isOpen() {
      return this.$store.state.register.openDialogRegister;
    }
  },
  watch: {},
  methods: {
    ...mapMutations({
      setOpenDialogRegister: 'register/setOpenDialogRegister'
    }),
    gotoRegister() {
      // const el = document.getElementById("register");
      // if (el) {
      //   window.scrollTo(0, el.offsetTop);
      // }
      this.setOpenDialogRegister(true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
