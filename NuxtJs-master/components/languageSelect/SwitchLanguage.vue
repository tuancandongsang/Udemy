<template>
  <div class="language">
    <!-- <div>
      <global-outlined />
    </div> -->
    <div class="language-box">
      <!-- <select name="" id=""  @change="log" placeholder="Language">
        <option value="vn">
          Tiếng Việt
        </option>
        <option value="en"> English</option>
      </select> -->
      <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang">
          {{ lang }}
      </option>
    </select>
    </div>

  </div>
</template>

<script>
// import { GlobalOutlined } from "@ant-design/icons-vue";
export default {
  name: 'SwitchLocale',
  data() {
    return {
      langs: ['en', 'vn']
    }
  },
  // components: { GlobalOutlined },
  methods: {
    // log(e){
    //   console.log(e.target.value);
    //   this.$store.commit('SET_LANG', e.target.value)
    // }
  },
}
</script>

<style>
select {
  outline: none;
  border: none;
  /* border-radius: 50%; */
  /* line-height: 49px; */
  /* height: 38px; */
  /* font-size: 22px; */
  /* margin-bottom: 15px; */
  position: absolute;
  top: 15%;

}

.language {
  margin-left: 20px;
  display: flex;
  /* align-items: center; */
}

.language-box {
  position: relative;
}
</style>