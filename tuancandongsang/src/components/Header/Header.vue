<template>
  <div class="header">
    <ul class="header-ul">
      <li>
        <router-link to="/input-keyboard-valid"
          >input keyboard valid</router-link
        >
      </li>
      <li>
        <router-link to="excel-export">xuat excle </router-link>
      </li>
      <li><router-link to="import-excel">import-excel</router-link></li>
      <li><router-link to="refresh">refresh of time</router-link></li>
      <li><router-link to="css">CSS</router-link></li>
      <li> <router-link to="debounce" > debounce & throttle </router-link> </li>
      <li><router-link to="createNamespacedHelpers">createNamespacedHelpers vuex</router-link></li>
      <li>validate input</li>
      <li>validate input</li>
      <li>validate input</li>
      <li>validate input</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.header {
  background-color: #999;
  width: 300px;
  margin-right: 10px;
}
.header-ul {
  padding: 20px 10px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
li {
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
}
li:hover {
  opacity: 0.5;
}
</style>
