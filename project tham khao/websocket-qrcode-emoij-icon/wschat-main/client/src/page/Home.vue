<template>
  <div id="home">
    <div class="container">
      <h1 class="tittel">Chat client with WEBSOCKET</h1>
      <QRGenerator></QRGenerator>
    </div>
  </div>
</template>

<script>
import QRGenerator from "../components/home/QRGenerator.vue";
export default {
  components: { QRGenerator },
};
</script>
<style lang="scss" scoped>
#home {
  display: flex;
  justify-content: center;
  .container {
    max-width: 800px;
    margin-top: 100px;
  }
  .tittel {
    text-align: center;
    margin-bottom: 60px;
  }
}
</style>
