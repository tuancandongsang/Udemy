<template>
  <a-pagination showLessItems :total="renderListTotal" :showSizeChanger="false" @change="handleChangePage"
    v-model:current="pageNumber" v-model:pageSize="pageSize" size="small" />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      pageSize: 20,
    };
  },
  async created() {
    await this.getAllList();
  },
  methods: {
    ...mapMutations(['changepagenumber', 'formatpageSize', "formatnodataCSSinit"]),
    ...mapActions(['getAllList']),
    handleChangePage(pageNumber, pageSize) {
      this.changepagenumber(pageNumber);
      console.log(pageNumber, pageSize);
      this.formatpageSize(5);
      this.formatnodataCSSinit()
    },
  },
  computed: {
    ...mapGetters([
      'itemsList',
      'renderList',
      'pageNumber',
      'renderListTotal',
      'filter',
      "itemSystem",
      'itemsProcess',
      'valueDate'
    ]),
    renderListTotal() {
      if (this.filter == 'allEvent') {
        return this.itemsList.length;
      }
      if (this.filter == 'process') {
        return this.itemsProcess.filter((item) => item.initialDay == this.valueDate).length
      }
      if (this.filter == 'system') {
        return this.itemSystem.length;
      }
      return this.renderList.length;
    },
  },
};
</script>