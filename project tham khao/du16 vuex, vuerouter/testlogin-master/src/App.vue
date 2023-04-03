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
  mounted() {
    this.getAngle(window.orientation);
    window.addEventListener('orientationchange', this.getDimensions);
  },
  unmounted() {
    window.removeEventListener('orientationchange', this.getDimensions);
  },
};
</script>