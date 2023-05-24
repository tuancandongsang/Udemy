<template>
  <div>
    <div><button @click="refresh">reload</button></div>
    <select v-model="selectMinute">
      <option
        v-for="option in selectOptionsMinutes"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   selectedOption: null,
      //   options: [
      //     { label: "Option 1", value: "option1" },
      //     { label: "Option 2", value: "option2" },
      //     { label: "Option 3", value: "option3" },
      //   ],
      selectMinute: "none refresh",
      selectOptionsMinutes: [
        {
          label: "none refresh",
          value: "none refresh",
        },
        {
          label: "10 seconds",
          value: "10s",
        },
        {
          label: "3 seconds",
          value: "3s",
        },
        {
          label: "5 seconds",
          value: "5s",
        },
      ],
      interval: null,
    };
  },
  watch: {
    selectMinute(newValue, _oldValue) {
      this.runClearInterval();
      this.runRefreshInterval(newValue);
    },
  },
  computed: {},
  mounted() {
    this.runRefreshInterval(this.selectMinute);
  },
  methods: {
    refresh() {
      location.reload();
    },
    runRefreshInterval(val) {
      if (this.interval) {
        return;
      }
      let ms = 0; // none
      switch (val) {
        case "10s":
          ms = 10000;
          break;
        case "3s":
          ms = 3000;
          break;
        case "5s":
          ms = 5000;
          break;
        default:
          break;
      }

      if (ms === 0) {
        this.runClearInterval();
        return;
      }

      // reload lại trang
      // nếu reload lại dữ liệu thì gọi lại api
      this.interval = setInterval(() => this.refresh(), ms);
    },
    runClearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
  beforeDestroy() {
    this.runClearInterval();
  },
};
</script>
