<template>
  <div class="collection-body-filter">
    <div class="collection-body-filter-categories">
      <h4 class="collection-body-filter-categories-title">
        Product Categories
      </h4>
      <ul class="collection-body-filter-categories-list">
        <li
          v-for="item in productCategories"
          :key="item.id"
          class="collection-body-filter-categories-list__item"
        >
          <input
            :id="item.id"
            type="radio"
            :value="item.name"
            name="category"
            @click="handleFilterCategory(item.name)"
          />
          <label :for="item.id">{{ item.name }}</label>
        </li>
      </ul>
    </div>
    <div class="collection-body-filter-price">
      <h4 class="collection-body-filter-categories-title">Price</h4>
      <ul class="collection-body-filter-categories-list">
        <li
          v-for="item in productPrices"
          :key="item.id"
          class="collection-body-filter-categories-list__item"
        >
          <input
            :id="item.id"
            type="radio"
            :value="item.price"
            name="price"
            @click="handleFilterPrice(item.price)"
          />
          <label :for="item.id">{{ item.price }}</label>
        </li>
      </ul>
    </div>
    <div class="collection-body-filter-bestSeller">
      <h4 class="collection-body-filter-bestSeller-title">Best Seller</h4>
      <div
        v-for="item in productBestSeller"
        :key="item.id"
        class="collection-body-filter-bestSeller-item"
      >
        <RouterLink :to="'/product/' + item.id">
          <img
          :src="url + item.listImg[0]?.url"
            alt=""
            class="collection-body-filter-bestSeller-item__img"
        /></RouterLink>
        <div class="collection-body-filter-bestSeller-item__info">
          <p>{{ item.name }}</p>
          <span>${{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./productFilter.scss";
import requestProductDbJson from "../../api/requestProducDbJson";
export default {
  data() {
    return {
      url: "http://localhost:8081/api/image/downloadFile/",
      isTicked: false,
      productCategories: [
        { name: "All Categories", id: "cate1" },
        { name: "Furniture", id: "cate2" },
        { name: "Chair", id: "cate3" },
        { name: "Sofa", id: "cate4" },
        { name: "Decor Art", id: "cate5" },
      ],
      productPrices: [
        {
          price: "$0 - $50",
          id: 1,
        },
        {
          price: "$50 - $100",
          id: 2,
        },
        {
          price: "$100 - $150",
          id: 3,
        },
        {
          price: "$150 - $200",
          id: 4,
        },
      ],
      productBestSeller: [],
    };
  },
  methods: {
    handleFilterCategory(value) {
      this.$emit("handleFilterCategory", value);
    },
    handleFilterPrice(value) {
      this.$emit("handleFilterPrice", value);
    },
  },
  async created() {
    try {
      const response = await requestProductDbJson.get(
        `/api/products?page=1&size=5`
      );
      this.productBestSeller = response.data.voList;
    } catch (error) {}
  },
};
</script>

<style></style>
