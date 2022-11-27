<template>
  <div id="home-page">
    <div class="container-fluid">
      <div class="table-list">
        <div class="header">
          <div class="left-side">
            <p>Entries</p>
            <div class="select-page-size">
              <a-select ref="select" v-model:value="pageSize" style="width: 120px; height: 40px" :options="options"
                @change="handleChange">
              </a-select>
            </div>
            <RouterLink to="/add-blogs"> Add Blogs </RouterLink>
          </div>
          <div class="right-side">
            <a-input class="input-search" size="large" @input="debounceSearch"
              placeholder="Searching..." />
          </div>
        </div>
        <Table :columns="columns" :source="source" @handleChangePage="handleChangePage" :showLoading="showLoading"
          :numberPanigation="numberPanigation"   :current="current"/>
      </div>
    </div>
  </div>
</template>
  
<script>
import "../home-page.scss";
import Table from "@/components/table/Table.vue";
import { getJwtToken } from "@/utils/helpers";
import axios from 'axios'
import BlogsService from "@/api/BlogsService";
import ProductService from "@/api/ProductService";



export default {
  components: { Table },

  data() {
    return {
      pageSize: 10,
      current: 1,
      pageNumber: 1,
      searchProduct: "",
      debounce: null,
      numberPanigation: 50,
      options: [
        {
          value: 5,
          label: 5,
        },
        {
          value: 10,
          label: 10,
        },
        {
          value: 20,
          label: 20,
        },
        {
          value: 50,
          label: 50,
        },
      ],
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
          width: 200,
        },
        {
          title: "Title",
          dataIndex: "displayName",
          key: "displayName",
        },
        {
          title: "Stage Name",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "categories",
          dataIndex: "categories",
          key: "categories",
        },
        {
          title: "Created Date",
          dataIndex: "createdDate",
          key: "createdDate",
        },
        // {
        //   title: "Updated Date",
        //   dataIndex: "updatedDate",
        //   key: "updatedDate",
        // },
        // {
        //   title: "Created User",
        //   dataIndex: "createdUser",
        //   key: "createdUser",
        // },
        {
          title: "edit",
          key: "edit",

        },
      ],
      source: [],
      showLoading: false,
      totalItem: null,

    };
  },

  async created() {
    try {
      const response = await BlogsService.getBlogs(1, 10)
      this.totalItem = response.total
      this.source = this.transformData(response.voList);
    } catch (error) {}
    this.numberPanigation = Math.ceil(this.totalItem / this.pageSize) * 10
    this.$watch(
      () => this.$store.state.auth.isLogin,
      (value, _) => {
        if (!this.$store.state.auth.isLogin) {
          this.$router.push({
            name: "login-page",
          });
        }
      }
    )
  },
  computed: {
    source() {
      return this.source;
    },
    numberPanigation() {
      return Math.ceil(this.totalItem / this.pageSize) * 10
    },
    current(){
      return this.pageNumber
    }
  },

  methods: {
    transformData(arr) {
      return arr.map((item) => ({
        id: item?.id,
        displayName: item?.title,
        price: item?.userName,
        categories: 'chua co',
        createdDate: item.createdDtm
          ?.slice(0, 10)
          .split("-")
          .reverse()
          .join("-"),
      }));
    },
    async startListProduct() {
      try {
        const response = await BlogsService.getBlogs(this.pageNumber, this.pageSize)
        this.totalItem = response.total
        const data = this.transformData(response.voList);
        this.source = data;
      } catch (error) { }
    },
    async startListSearch() {
      try {
        const response = await BlogsService.searchBlogs(this.pageNumber, this.pageSize, this.searchProduct)
        this.totalItem = response.total
        const data = this.transformData(response.voList);
        return (this.source = data);
      } catch (error) {
        this.source = [];
      }
    },
    debounceSearch(e) {
      this.showLoading = true
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.showLoading = false
        this.searchProduct = e.target.value.trim();
        if (this.searchProduct === "") {
          this.pageNumber = 1
          this.startListProduct();
        } else {
          this.pageNumber = 1
          this.startListSearch();
        }
      }, 500);
    },

    async handleChange(pageSize) {
      this.pageNumber=1
      this.showLoading = true
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.pageSize = pageSize;
        this.showLoading = false
        this.numberPanigation = Math.ceil(this.totalItem / this.pageSize) * 10
        if (this.searchProduct !== "") {
          this.startListSearch();
        } else {
          this.startListProduct();
        }
      }, 500);
    },
    async handleChangePage(pageNumber) {
      this.showLoading = true
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.showLoading = false
        this.pageNumber = pageNumber;
        if (this.searchProduct !== "") {
          this.startListSearch();
        } else {
          this.startListProduct();
        }
      }, 500)
    },
  },
}
</script>
  
<style scoped>

</style>
  