<template>
  <div class="search">
    <Search />
    <p>
      Total: <b>{{ numberSearch }}</b>
    </p>
  </div>
</template>
  <script >
import { mapGetters } from 'vuex';

import Search from '@/components/Search/index.vue';
export default {
  components: { Search },
  computed: {
    ...mapGetters(['filter', 'itemsList', 'itemSystem', 'itemsProcess']),
    numberSearch() {
      if (this.filter == 'allEvent') {
        return this.itemsList.length;
      } else if (this.filter == 'system') {
        return this.itemSystem.length;
      } else if (this.filter == 'process') {
        return this.itemsProcess.length;
      } else return 0;
    },
  },
};
</script>
  <style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60px;
  P {
    margin-top: 4px;
    align-self: start;
    padding-left: 60px;
  }
}
</style>