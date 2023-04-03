<script setup>
import { RouterView } from 'vue-router'
import Logo from './components/Logo.vue'
import styles from './assets/main.css'
import { defineComponent } from 'vue'

</script>
<script>
export default defineComponent({
  styles: [styles],

})
</script>
<template>
  <div class="layout">
    <Logo />

    <RouterView />
  </div>
</template>

<style scoped>
.layout {
  width: 1200px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 20px;
}
</style>
