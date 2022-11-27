<template>
  <div id="product-detail">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-8 mx-auto">
          <a-carousel dots-class="slick-dots slick-thumb" effect="fade">
            <template #customPaging="props">
              <a>
                <img :src="getImgUrl(props.i)" />
              </a>
            </template>
            <div v-for="(item, index) in productDetail?.images" :key="item">
              <img :src="getImgUrl(index)" />
            </div>
          </a-carousel>
        </div>
        <div class="col-xl-8">
          <div class="mt-xl-0 mt-5">
            <div class="d-flex">
              <div class="flex-grow-1">
                <h4 class="title-desc">{{ productDetail?.displayName }}</h4>
                <div class="hstack gap-3 flex-wrap mb-3">
                  <div class="fs-15 text-muted">
                    Created User :
                    <span class="text-body fw-medium">{{
                    productDetail?.creator.name
                    }}</span>
                  </div>
                  <div class="vr"></div>
                  <div class="fs-15 text-muted">
                    Updated Date :
                    <span class="text-body fw-medium">{{
                    moment(productDetail?.updatedDtm).format("ll")
                    }}</span>
                  </div>
                  <div class="vr"></div>
                  <div class="fs-15 text-muted">
                    ID :
                    <span class="text-body fw-medium">{{
                    productDetail?.id
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-sm-6 mb-3">
                <div class="p-2 border border-dashed rounded">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-2">
                      <div class="avatar-title rounded bg-transparent text-success fs-24">
                        <img src="../../assets/images/usd-circle-free-icon-font.png" alt="" class="img-fluid d-block" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <p class="text-muted mb-1 fs-15">Price :</p>
                      <h5 class="mb-0 fs-15">${{ productDetail?.price }}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-3">
                <div class="p-2 border border-dashed rounded">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-2">
                      <div class="avatar-title rounded bg-transparent text-success fs-24">
                        <img src="../../assets/images/document-free-icon-font.png" alt="" class="img-fluid d-block" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <p class="text-muted mb-1 fs-15">Created Date :</p>
                      <h5 class="mb-0 fs-15">
                        {{ moment(productDetail?.createdDtm).format("ll") }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-3">
                <div class="p-2 border border-dashed rounded">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-2">
                      <div class="avatar-title rounded bg-transparent text-success fs-24">
                        <img src="../../assets/images/id-badge-free-icon-font.png" alt="" class="img-fluid d-block" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <p class="text-muted mb-1 fs-15">Category ID :</p>
                      <h5 class="mb-0 fs-15">{{ productDetail?.id }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 text-muted">
              <h5 class="title-desc">Description :</h5>
              <p class="text-muted fs-15">
                {{ productDetail?.description ?? "" }}
              </p>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="mt-4">
                  <h5 class="title-desc">Categories :</h5>
                  <ul v-for="item in productDetail?.categories" :key="item" class="fs-15 list-unstyled">
                    <li class="p-1 text-list">{{ item.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "./product-detail.scss";
import moment from "moment";
import ProductService from '@/api/ProductService'

export default {
  data() {
    const getImgUrl = (i: number) => {
      return `${this.url}` + `${this.productDetail.images[i].url}`;
    };
    const url = 'http://localhost:8081/api/image/downloadFile/';
    return {
      getImgUrl,
      productDetail: null,
      url,
    };
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
  },
  async created() {
    const response = await ProductService.getDetail(this.$route.params.id);
    this.productDetail = response;
    this.$watch(
      () => this.$route.params.id,
      async (value, _) => {
        const response = await ProductService.get(`${value}`);
        this.productDetail = response;
      }
    );
  },
};
</script>
<style scoped>
.ant-carousel>>>.slick-dots {
  height: auto;
  margin: 20px 0 0 0;
  position: relative;
}

.ant-carousel>>>.slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  background-color: #f3f6f9;
}

.ant-carousel>>>.slick-thumb {
  bottom: 0;
}

.ant-carousel>>>.slick-thumb li {
  width: 88.2px;
  height: 88.2px;
  border-radius: 4px;
  border: 1px solid #e9ebec;
}

.ant-carousel>>>.slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  background: #f3f6f9;
}

.ant-carousel>>>.slick-thumb .slick-active {
  background-color: #f3f6f9;
}

.ant-carousel>>>.slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
