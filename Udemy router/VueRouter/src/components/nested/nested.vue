<template>
  <div>
    <h2>Select Album</h2>
    <div class="container">
      <div>
        <ul>
          <li><router-link to="/nested/img1">img1</router-link></li>
          <li><router-link to="/nested/img21">img2+1</router-link></li>
          <li><router-link to="/nested/img32">img3+2</router-link></li>
          <li><router-link to="/nested/icon">Icon</router-link></li>

          <!-- SỬ DỤNG NAME Ở ROUTER LINK -->
          
          <!-- <li><router-link :to="{ name: 'img1' }">img1</router-link></li>
          <li><router-link :to="{ name: 'img21' }">img2+1</router-link></li>
          <li><router-link :to="{ name: 'img32' }">img3+2</router-link></li> -->
        </ul>
      </div>
      <div class="item_img">
        <router-view />
        <router-view name="a" />
        <router-view name="b" />
        <router-view name="c" />
        <router-view name="d" />
      </div>
    </div>
  </div>
</template>
<style>
ul {
  list-style-type: none;
  margin-right: 50px;
}

li {
  color: black;
  font-size: 1.5rem;

}

.container {
  display: flex;
}

.item_imgP {
  display: flex;
}
</style>