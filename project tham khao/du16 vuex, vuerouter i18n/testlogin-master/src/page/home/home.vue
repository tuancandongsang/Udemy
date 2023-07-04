<template>
  <div class="home">
    <div class="calendar" v-if="filter == 'process'">
      <Calendar />
    </div>
    <Search v-if="filter == 'system'" />
    <Search v-if="filter == 'allEvent'" />
    <ListVue />
    <div class="pagination">
      <Pagination />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Calendar from '@/components/Celendar/Calendar.vue';
import Search from './component/search.vue';
import ListVue from './component/ListVue.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import "./Home.scss"
export default {
  components: { ListVue, Pagination, Search, Calendar },
  computed: {
    ...mapGetters(['filter']),
  },
};
</script>