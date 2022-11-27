<template>
  <div>
    <div id="product-detail">
      <div class="body">
        <div class="container">
          <div class="row">
            <div class="col-xxl-6 col-xl-6 col-lg-6 col-12">
              <div class="images">
                <a-carousel arrows dots-class="slick-dots slick-thumb">
                  <template #customPaging="props">
                    <a>
                      <img :src="getImgUrl(props.i)" />
                    </a>
                  </template>
                  <div v-for="item in productDetail?.images?.length" :key="item">
                    <img :src="getImgUrl(item-1)" />
                  </div>
                </a-carousel>
              </div>
            </div>
            <div class="col-xxl-6 col-xl-6 col-lg-6 col-12">
              <div class="info">
                <h2>{{ productDetail?.displayName }}</h2>
                <p>
                  <a-rate v-model:value="rate" allow-half /> ({{rate}} Review)
                </p>
                <p>
                  {{ productDetail?.description }}
                </p>
                <h5>${{ price }}</h5>
                <div class="action">
                  <div class="quantity">
                    <button class="btn" @click="handleDiminishQty">-</button>
                    <p>{{ quantity }}</p>
                    <button class="btn" @click="handleInscreQty">+</button>
                  </div>
                  <button class="btn-add-to-cart" type="button" @click="showCartDetail(productDetail?.id)">
                    <p class="icon">
                      <img src="../../assets/images/shopping-bag-w-24.png" alt="shop-cart" />
                    </p>
                    <div class="text-field">Add To Cart</div>
                  </button>
                </div>
                <p class="category">
                  <b>Categories: </b>
                  <span>{{
                  productDetail?.categories
                  ?.map((category) => ` ${category.name}`)
                  .toString() || ""
                  }}</span>
                </p>
                <p><b>Availability: <span>In stock</span></b></p>
                <p><b>Product type: <span>Demo Type</span></b></p>
                <p><b>Vendor: <span>Demo Vender</span></b></p>
                <p><b>Share:
                    <span>
                      <twitter-outlined />
                    </span>
                    <span>
                      <google-outlined />
                    </span>
                    <span>
                      <google-outlined />
                    </span>
                    <span>
                      <facebook-outlined />
                    </span>
                    <span>
                      <skype-outlined />
                    </span>
                  </b></p>
              </div>
            </div>
          </div>
          <div class="container-infor">
            <div class="container-infor-header">
              <ul>
                <li v-on:click="currentTab = 'Detail'">Detail</li>
                <li v-on:click="currentTab = 'Shipping'"> Shipping $ Return</li>
                <li v-on:click="currentTab = 'Review'">Review</li>
              </ul>
            </div>
            <div>
              <keep-alive include="Detail,Shipping,Review ">
                <component :is="componentId"></component>
              </keep-alive>
            </div>
          </div>
          <div class="row">
            <div class="products-relate">
              <h2 class="text-center">maybe you like</h2>
              <p class="text-center">
                Mirum est notare quam littera gothica quam nunc putamus parum
                claram!
              </p>
              <div class="products-see-more">
                <Carousel :slidesToShow="4" :dots="false">
                  <div class="item" v-for="product in products" v-bind:key="product.id">
                    <div class="action">
                      <button class="btn btn-add-cart" @click="showCart(product.id)">
                        <span>
                          <img src="../../assets/images/shopping-bag-16.png" alt="add-cart" />
                        </span>
                      </button>
                      <button class="btn btn-view" v-on:click="handleVisibleViewInfoModal">
                        <span>
                          <img src="../../assets/images/search-b-16.png" alt="add-cart" />
                        </span>
                      </button>
                    </div>
                    <RouterLink v-bind:to="'/product/' + product.id">
                      <div class="img">
                        <img v-bind:src="urlImg + product?.listImg[0]?.url" alt="product" />
                      </div>
                    </RouterLink>
                    <RouterLink v-bind:to="'/product/' + product.id">
                      <h5>{{ product.name }}</h5>
                    </RouterLink>
                    <p>${{ product.price }}</p>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cart />
  </div>
</template>

<script >
import "./product-detail.scss"
import Carousel from "@/components/carousel/Carousel.vue"
import Drawer from "@/components/drawer/Drawer.vue"
import Cart from "@/components/cart/Cart.vue"
import ProductService from "@/api/ProductService"
import { formatNumber, reloadWindowOne } from '@/utils/common'
import Detail from './component/Detail.vue'
import Shipping from './component/Shipping.vue'
import Review from './component/Review.vue'
import {
  TwitterOutlined,
  GoogleOutlined,
  FacebookOutlined,
  SkypeOutlined,
} from '@ant-design/icons-vue'

export default {
  data() {
    return {
      rate: 4.5,
      urlImg: 'http://localhost:8081/api/image/downloadFile/',
      productDetail: {},
      products: [],
      isVisibleDrawer: false,
      quantity: 1,
      currentTab: 'Detail',
      props: {}
    };
  },
  methods: {
    getImgUrl(i) {
      const img = this.productDetail?.images[i]?.url
      return `${this.urlImg}${img}`;
    },
    showCartDetail(id) {
      const index = this.products.findIndex((item) => item.id === id);
      const infor = this.products[index];
      const data = {
        listImg: infor.listImg,
        id: infor.id,
        name: infor.displayName,
        price: infor.price,
        quantity: this.quantity,
      };
      this.$store.commit("ADD_PRODUCT_DETAIL", {
        id: id,
        data: data,
      });
      this.$store.commit("ISVISIBLE_CART");
    },
    showCart(id) {
      const index = this.products.findIndex((item) => item.id === id);
      const infor = this.products[index];
      const data = {
        listImg: infor.listImg,
        id: infor.id,
        name: infor.displayName,
        price: infor.price,
        quantity: 1,
      };
      this.$store.commit("ADD_PRODUCT_ONE", data);
      this.$store.commit("ISVISIBLE_CART");
    },
    handleCloseDrawer() {
      this.isVisibleDrawer = false;
    },
    handleInscreQty() {
      this.quantity += 1;
    },
    handleDiminishQty() {
      this.quantity -= 1;
    },
  },
  computed: {
    componentId() {
      return this.currentTab
    },
    quantity() {
      if (this.quantity < 1) {
        return (this.quantity = 1);
      }
      return this.quantity;
    },
    price() {
      return formatNumber(this.productDetail?.price)
    }
  },
  async created() {
    const productsList = await ProductService.getList(1, 8);
    this.products = productsList.voList;

    const detail = await ProductService.getProductDetail(this.$route.params.id);
    this.productDetail = detail;

    // if (response) {
    //   this.products.push(response);
    // }
    // this.productDetail = response.data;


    this.$watch(
      () => this.$route.params.id,
      async (value, _) => {
        const response = await ProductService.getProductDetail(value);
        this.productDetail = response;
        this.quantity = 1;
        reloadWindowOne()
      }
    );
  },
  components: {
    TwitterOutlined,
    GoogleOutlined,
    FacebookOutlined,
    SkypeOutlined,
    Carousel,
    Drawer,
    Cart,
    Detail,
    Shipping,
    Review,
  },
};
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}

.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}

.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}

.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}

.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}

.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}

.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
