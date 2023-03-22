<template>
  <div id="QRcode">
    <div class="container">
      <div class="QRcode-input">
        <div class="QRcode-input-item">
          <Input
            placeholder="channel-name"
            ref="channelRoom"
            @debounceSearch="debounceSearch"
          />
        </div>
        <div class="QRcode-input-item">
          <Input placeholder="Username" ref="username" />
        </div>
        <div>
          <buttonVue @click="gotoRoomChat" content="Go Room" />
        </div>
      </div>
      <div v-if="qr.output">
        <div v-html="qr.output" class="img-qrcode"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { toString } from "qrcode";
import Input from "../input/Input.vue";
import buttonVue from "../button/button.vue";
export default {
  components: { Input, buttonVue },
  data() {
    return {
      username: "",
      dataImg: [
        "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/336165901_770025791435801_2123941285622724442_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=973b4a&_nc_ohc=Qg5jWQXw0DsAX_wVzFg&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCjresxkij4xzF8ntEDNIaWI5F-SYrsA8r0nvw1tBwitw&oe=641E8157",
        "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/336781559_2634719400008689_4631961613588902370_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=973b4a&_nc_ohc=EkETG1OkTSUAX9kCknx&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJYAX3mdJBtgXyh-t3FfqGYf4KDLmma-9J64inTFmaqw&oe=641F350C",
        "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/337118926_234458205724163_9023423502789673984_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=973b4a&_nc_ohc=Lc-bJ3CxVTwAX_Uzuwr&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDTkOUwsT-5nlb9D-xMN2oFUYkmkPHaHlqVlVnYWXJz9A&oe=641EACAB",
        "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/336671402_872281893865068_2730577341714052451_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=973b4a&_nc_ohc=10OLBNSQeycAX9gniUL&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDOBb_F_4okgStVWCQjQPdYCUjhTfaOU-g7hoyFWURo-w&oe=641EFA44",
        "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/336290810_1183852748992562_2679276937210439724_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=973b4a&_nc_ohc=eNoGCphC-tQAX_luQwQ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCp0-x_jY7waN09FL61XQDQmgucbFMcj3cVfFtn4rQq4w&oe=641EAFFE",
        "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/336807794_885870822485675_3642735414974693189_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=973b4a&_nc_ohc=FdSw_aFBMM4AX_U41QW&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAbWCxytJ7H1CdDucyNkp0DMYSd0HHFwpiZjxAGKVnO9Q&oe=641E565B",
        "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/337244616_188479680248437_1155879467391378741_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=973b4a&_nc_ohc=EQ1_KGyc6BAAX_T2a44&_nc_ht=scontent.fhan14-1.fna&oh=00_AfB4x-N3g38p1Bz9lhS-WJhDEpmAMLzdWRPyzR1h0D1mfw&oe=641DEEF0",
        "https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg",
        "https://thuthuatnhanh.com/wp-content/uploads/2022/03/Avatar-TikTok.jpg",
        "https://img.meta.com.vn/Data/image/2022/01/06/avatar-tiktok-10.jpg",
        "https://saigonmelinh.com.vn/wp-content/uploads/2022/09/hinh-anh-avatar-de-thuong.jpg",
        "https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute-cho-cap-doi.jpg",
        "https://hinhnen123.com/wp-content/uploads/2021/09/bia-Top-500-hinh-meo-chibi-cute-de-thuong-nhat-the-gioi.jpg",
        "https://hinhnen123.com/wp-content/uploads/2021/09/Top-500-hinh-meo-chibi-cute-de-thuong-nhat-the-gioi-2.jpg",
        "https://hinhnen123.com/hinh-meo-chibi-cute/top-500-hinh-meo-chibi-cute-de-thuong-nhat-the-gioi-3/",
        "https://kynguyenlamdep.com/wp-content/uploads/2022/07/hinh-ve-sticker-cute-dang-yeu.jpg",
        "https://vothisaucamau.edu.vn/wp-content/uploads/2023/02/1675731093_475_99-Hinh-Ve-Con-Vat-Chibi-Cute-Dang-Yeu-De.jpg",
      ],
      qr: {
        url: "",
        svg_output: "",
        url_input: "",
        url_input_timeout: null,
      },
    };
  },
  methods: {
    generateQr() {
      this.qr.url = this.qr.url.trim();
      if (!this.qr.url) {
        this.qr.output = null;
        return;
      }
      toString(
        this.qr.url,
        { color: { dark: "#000000", light: "#0000" } },
        (err, string) => {
          if (err) throw err;
          this.qr.output = string;
        }
      );
    },
    randomImgAvatar() {
      const index = Math.floor(Math.random() * this.dataImg.length);
      return this.dataImg[index];
    },
    gotoRoomChat() {
      window.localStorage.setItem("username", this.$refs.username.value);
      window.localStorage.setItem("img", this.randomImgAvatar());
      this.$router.push(`/${this.$refs.channelRoom.value}`);
    },
    debounceSearch(text) {
      if (this.qr.url_input_timeout) {
        clearTimeout(this.qr.url_input_timeout);
      }
      this.qr.url_input_timeout = setTimeout(() => {
        this.qr.url = text;
        this.generateQr();
      }, 400);
    },
  },
};
</script>
<style scoped lang="scss">
#QRcode {
  width: 100%;
  .container {
    .QRcode-input {
      display: flex;
      width: 100%;
      gap: 12px;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
      &-item {
        flex: 1;
      }
    }

    .img-qrcode {
      padding: 12px;
      border: 1px solid #fff;
      border-radius: 20px;
      background-color: #fff;
      width: 100%;
    }
  }
}
</style>
