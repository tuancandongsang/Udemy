<template>
  <div>
    <div class="layout-grid">
      <div class="item-grid" v-for="img in imgs" :key="img"> <img :src="img" alt="" /></div>
    </div>
    <div>
      <div class="layout-grid-mobile">
        <div class="item-grid-mobile" v-for="img in imgs" :key="img"> <img :src="img" alt="" /></div>
      </div>
    </div>
  </div>

</template>

<script>
import data from '../../mixins/data';
export default {
  name: 'Dashboard',
  mixins: [data],
  created() {
    console.log(this.imgs);
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: 100%;
  border-radius: 5px;

}

.layout-grid-mobile {
  display: none;
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

@media screen and (max-width: 1440px) {
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

@media screen and (max-width: 500px) {

  .layout-grid {
    display: none;
  }

  .item-grid-mobile {
    scroll-snap-align: start;
    /* scroll-snap-align: center; */
    /* scroll-snap-align: end; */

  }

  .layout-grid-mobile {
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
}
</style>