<template>
    <a-space direction="vertical">
      <a-date-picker v-model:value="value" :format="dateFormat" @change="onChange" />
    </a-space>
</template>
<script>
import { mapMutations } from 'vuex';
import { timeChangeString, dateFormat } from '@/utils/dateMoment'
export default {
  data() {
    return {
      value: dateFormat,
      time: timeChangeString,
    };
  },
  created() {
    this.updatedDate(timeChangeString);
  },
  methods: {
    ...mapMutations(['updatedDate', 'fomatPageNumber', "formatpageSize", 'formatnodataCSSinit']),
    onChange(date, dateString) {
      console.log(date, dateString);
      this.updatedDate(dateString);
      this.fomatPageNumber();
      this.formatpageSize(5);
      this.formatnodataCSSinit()
    },
  },
};
</script>