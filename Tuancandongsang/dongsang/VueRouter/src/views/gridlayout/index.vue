<template>
  <div class="layout-grid">
    <div class="item-grid1 "><img src="https://i.pinimg.com/736x/70/5c/8b/705c8b2364417b341216d075ede4b158.jpg" alt="">
    </div>
    <div class="item-grid2 "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-grid3 "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-grid4 "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-grid5 "><img src="https://i.pinimg.com/736x/70/5c/8b/705c8b2364417b341216d075ede4b158.jpg" alt="">
    </div>
    <div class="item-grid6 "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-grid7 "><img src="https://i.pinimg.com/736x/70/5c/8b/705c8b2364417b341216d075ede4b158.jpg" alt="">
    </div>
    <div class="item-grid8 "><img
        src="https://images.pexels.com/photos/14420090/pexels-photo-14420090.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt=""></div>
    <div class="item-grid9 "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-grida "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-gridb "><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <div class="item-gridc"><img src="https://c1.staticflickr.com/9/8112/8477434985_5f637b7d84_z.jpg" alt="">
    </div>
    <!-- <div class="item-grid"><img src="https://i.pinimg.com/736x/70/5c/8b/705c8b2364417b341216d075ede4b158.jpg" alt="">
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: 100%;
  border-radius: 5px;

}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(7, 300px);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas:
    "h1 h1 h2 h3 h4 h5 h5"
    "h6 h6 h7 h7 h8 h9 h10"
    "h6 h6 h11 h12 h8 h13 h13"
  ;
  grid-gap: 20px;
  padding: 20px;
}

.item-grid:nth-child(1) {
  grid-area: h1;
}

.item-grid:nth-child(2) {
  grid-area: h2;
}

.item-grid:nth-child(3) {
  grid-area: h3;
}

.item-grid:nth-child(4) {
  grid-area: h4;
}

.item-grid:nth-child(5) {
  grid-area: h5;
}

.item-grid:nth-child(6) {
  grid-area: h6;
}

.item-grid:nth-child(7) {
  grid-area: h7;
}

.item-grid:nth-child(8) {
  grid-area: h8;
}

.item-grid:nth-child(9) {
  grid-area: h9;
}

.item-grid:nth-child(10) {
  grid-area: h10;
}

.item-grid:nth-child(11) {
  grid-area: h11;
}

.item-grid:nth-child(12) {
  grid-area: h12;
}

.item-grid:nth-child(13) {
  grid-area: h13;
}

@media screen and (max-width: 1024px) {
  .layout-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 200px);
    grid-template-areas:
      "h1 h1 h2 h3 h4"
      "h6 h6 h7 h7 h8 "
      "h6 h6 h11 h12 h8 "
      "h10 h5 h5 h9 h13"
    ;
    grid-gap: 20px;
    padding: 20px;
  }
}

@media screen and (max-width: 768px) {
  .layout-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 200px);
    grid-template-areas:
      "h1 h1 h2 h3"
      "h6 h6 h7 h7"
      "h6 h6 h11 h12 "
      "h5 h5 h10 h9"
      "h8 h13 h13 h13 "
      "h8 h4 h4 h4"
    ;
    grid-gap: 20px;
    padding: 20px;
  }
}

@media screen and (max-width: 425px) {

  .layout-grid {
    grid-template-rows: 300px;
    grid-template-areas: none;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 80%;
    grid-gap: 30px;
    overflow-x: auto;
    scroll-padding-top: always;
    scroll-snap-type: x mandatory;
    grid-template-columns: unset;
    scroll-padding: 25px;
  }

  .item-grid {
    grid-area: none !important;
    /* scroll-snap-align: start; */
    /* scroll-snap-align: center; */
    /* scroll-snap-align: end; */
  }
}
</style>