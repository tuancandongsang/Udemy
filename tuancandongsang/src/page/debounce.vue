<template>
  <div style="display: flex; gap: 50px">
    <div>
      <h2>debounce</h2>
      <span>bấm nhiều lần chỉ nhận lần cuối</span>
      <div>
        <button @click="refresh" :class="hinden ? 'hinden' : ''">
          refresh debounce
        </button>
      </div>
      <div>
        <ul>
          <li v-for="item in data" :key="item.id">{{ item.title }}</li>
        </ul>
      </div>
    </div>
    <div>
      <h2>throttle</h2>
      <span>2s sau tự động lưu</span>
      <div>
        <label for="throttle">throttle</label>
        <input
          type="text"
          placeholder="throttle...."
          v-model="description"
          @input="throttleSaveData"
        />
      </div>
      <p>{{ throttleCallData }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hinden: false,
      data: [],
      throttleCallData: [],
      description: "",
      timeOut: null,
    };
  },
  created() {
    this.throttleSaveData = this.throttle(this.saveDecscription, 2000);
  },
  methods: {
    throttle(callback, timeout = 0) {
      let waiting = false;
      return (...args) => {
        if (!waiting) {
          waiting = true;
          setTimeout(() => {
            waiting = false;
            callback(...args);
          }, timeout);
        }
      };
    },
    saveDecscription() {
      console.log("call api");
      this.throttleCallData.push(".");
    },
    refresh() {
      this.debounce(this.getUserList, 2000);
    },
    debounce(fn, delay) {
      this.hinden = true;
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.hinden = false;
        fn();
      }, delay);
    },
    async getUserList() {
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5"
        );
        this.data = data.data;
      } catch (error) {}
    },
  },
};
</script>

<style>
.hinden {
  opacity: 0.5;
  cursor: default !important;
  background-color: red;
}
</style>
