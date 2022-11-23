<template>
  <div>
    <h1> {{$t("common.sider")}} Bar</h1>
    <ul>
      <li><nuxt-link to="/">SSR_CSR</nuxt-link></li>
      <li><nuxt-link to="/structure">Structure</nuxt-link></li>
      <li><nuxt-link to="/routing">Routing vs pages</nuxt-link></li>
      <li><nuxt-link to="/nested">Nested Pages và Validate</nuxt-link></li>
      <li><nuxt-link to="/nuxtlink">Nuxt-link vs nuxt-child vs Nuxt</nuxt-link></li>
      <li><nuxt-link to="/layout">Layout và Middleware</nuxt-link></li>
      <li><nuxt-link to="/plugins">Plugins</nuxt-link></li>
      <li><nuxt-link to="/meta">Meta Tags vs SEO</nuxt-link></li>
      <li><nuxt-link to="/custom-loading">Custom loading</nuxt-link></li>
      <li><nuxt-link to="/vuex">VueX</nuxt-link></li>
      <li><nuxt-link to="/cors">CORS</nuxt-link></li>
      <li><nuxt-link to="/lodasd">Lodasd</nuxt-link></li>
      <li><nuxt-link to="/env">Env</nuxt-link></li>
      <li><nuxt-link to="/chartjs">Vue-Chartjs</nuxt-link></li>

      <li><nuxt-link to="/error">error</nuxt-link></li>
    </ul>
  </div>
</template>

<style scoped>
ul{
  width: 200px;
  list-style-type: none;
}
li{
  padding: 8px 0;

}
a{
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 800;
}
a:hover{
  color: tomato;
}
</style>
