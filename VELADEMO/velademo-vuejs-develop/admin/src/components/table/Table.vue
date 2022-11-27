<template>
  <div id="table-record">
    <a-table :columns="columns" :data-source="source" :pagination="false" :scroll="{ x: 1600, y: 600 } " :loading="showLoading">
      <template #headerCell="{ column }"> </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span class="actions">
            <router-link :to="urlPath + record.id">
              <p class="view-record">
                <img src="../../assets/images/eye.png" alt="view-record" />
              </p>
            </router-link>
          </span>
        </template>
      </template>
    </a-table>
    <div class="paginate">
      <p></p>
      <a-pagination 
      showLessItems 
      :total="numberPanigation" 
      :showSizeChanger="false"
       @change="handleChangePage"
       v-model:current="current"
       />
    </div>
  </div>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import "./table.scss";

export default {
  methods: {
    handleChangePage(pageNumber) {
      this.$emit("handleChangePage", pageNumber);
    }
  },
  props: {
    columns: Array,
    source: Array,
    showLoading:Boolean,
    numberPanigation:Number,
    urlPath: String,
    current:Number
  },
  components: {
    SmileOutlined,
    DownOutlined,
  },
  data() {
    return {};
  },
};
</script>
