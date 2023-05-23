<template>
  <div>
    <div>
      <input
        :value="textnumber"
        type="text"
        placeholder="chỉ nhập số"
        @keydown="onkeydownPreventNumber($event)"
        @input="handleChangeAdditionAllocation($event, 'number')"
      />
    </div>
    <div>
      <label for="">telephone</label>
      <input
        :value="textnumber"
        type="text"
        placeholder="chỉ nhập số"
        @keydown="onkeydownPreventNumber($event, 'telephone')"
        @input="handleChangeAdditionAllocation($event)"
      />
    </div>
    <div>
      <p>
        chỉ nhập số và các ký tự + ) ( và dấu . ngoài ra có thể ctrC, ctrA,
        ctrX, ctrV,
      </p>
      <p>
        luồng hoạt động:
        <br />
        keydown => input => value
      </p>
    </div>
  </div>
</template>

<script>
import { onkeydownPreventNumber } from "../utils/common";
export default {
  data() {
    return {
      onkeydownPreventNumber: onkeydownPreventNumber,
      textnumber: "",
    };
  },
  methods: {
    handleChangeAdditionAllocation(e, style) {
      if (style === "number") {
        if (!Number.isInteger(+e.target.value)) {
          // phải có dòng này thì paste mới oke được - Giàu giải thích rồi
          this.textnumber = e.target.value;

          this.$nextTick(() => {
            this.textnumber = '';
          });
          return;
        }
      }
      this.textnumber = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  margin-top: 20px;
  font-size: 30px;
}
</style>
