<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['getAngle']),
    getDimensions(event) {
      const { angle } = event.target.screen.orientation;
      this.getAngle(angle);
    },
  },
  created() {
    this.getAngle(window.screen.orientation.angle);
  },
  mounted() {
    window.addEventListener('orientationchange', this.getDimensions);
  },
  unmounted() {
    window.removeEventListener('orientationchange', this.getDimensions);
  },
};
</script>
