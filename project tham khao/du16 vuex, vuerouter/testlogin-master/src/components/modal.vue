<template>
  <div class="modal">
    <span @click="showModal"><i class="fa-solid fa-filter"></i></span>
    <a-modal v-model:visible="visible" title="Select Event Type" @ok="handleOk">
      <div class="modal-radio">
        <div class="modal-radio-item">
          <label for="process">Process Evevt</label><br />
          <input
            type="radio"
            id="process"
            name="fav_language"
            value="process"
            v-model="picked"
          />
        </div>
        <div class="modal-radio-item">
          <label for="system">System Event</label><br />
          <input
            type="radio"
            id="system"
            name="fav_language"
            value="system"
            v-model="picked"
          />
        </div>
        <div class="modal-radio-item">
          <label for="allEvent">All Event</label><br />
          <input
            type="radio"
            id="allEvent"
            name="fav_language"
            value="allEvent"
            v-model="picked"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      visible: false,
      picked: 'process',
    };
  },
  methods: {
    ...mapMutations(['changefilter', 'fomatPageNumber', "formatpageSize","formatnodataCSSinit"]),
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e.target.value);
      this.changefilter(this.picked);
      this.visible = false;
      this.fomatPageNumber();
      this.formatpageSize(5)
      this.formatnodataCSSinit()
      this.$router.push('/home')
    },
  },
  computed: {
    ...mapGetters(['filter']),
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/index.scss";

.modal {
  &-radio {
    &-item {
      @include flexBetween;
      gap: 20px;
      label {
        font-size: 1rem;
      }
      input {
        font-size: 1.5rem;
      }
    }
  }
}
</style>