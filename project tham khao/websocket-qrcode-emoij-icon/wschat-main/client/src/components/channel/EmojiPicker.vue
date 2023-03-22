<template>
  <div id="emoji_picker">
    <div class="picker_container">
      <div class="close-out-line-style" @click="closeDialogEmojiPicker">X</div>
      <div
        v-for="category in categories"
        :key="`category_${category}`"
        class="category"
      >
        <span>{{ category }}</span>
        <div class="emojis_container">
          <button
            v-for="(emoji, index) in category_emojis(category)"
            :key="`emoji_${index}`"
            @click="handleEmojiClick($event, emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </div>
    <div class="bottom_arrow"></div>
  </div>
</template>
<script>
import { CloseOutlined } from "@ant-design/icons-vue";
import emoji_picker from "../../mixin/emojis-data.json";
export default {
  props: {},
  components: {
    CloseOutlined,
  },
  data() {
    return {
      listEmoji: [],
      isPost: false,
    };
  },
  computed: {
    categories() {
      return Object.keys(emoji_picker);
    },
    category_emojis: () => (category) => {
      return Object.values(emoji_picker[category]);
    },
  },
  methods: {
    handleEmojiClick(e, emoji) {
      e.preventDefault();
      this.isPost = !this.isPost;
      this.$emit("emoji_click", emoji);
    },
    closeDialogEmojiPicker() {
      this.$emit("closeDialogEmojiPicker");
    },
  },
};
</script>
  
<style scoped>
#emoji_picker {
  display: flex;
  flex-direction: column;
  width: 23rem;
  height: 25rem;
}

#emoji_picker,
.bottom_arrow {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
}

#emoji_picker,
.picker_container {
  border-radius: 0.5rem;
  background: black;
  max-height: 400px;
  overflow: hidden;
}

.close-out-line-style {
  color: aqua;
  font-size: 20px;
  margin-top: 7px;
  margin-right: 25px;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  font-weight: 900;
}

.picker_container {
  padding-left: 2rem;
  overflow: auto;
  z-index: 1;
}

.picker_container::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}

.category {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: rgb(169, 169, 169);
}

.emojis_container {
  display: flex;
  flex-wrap: wrap;
}

.category button {
  margin: 0.5rem;
  margin-left: 0;
  background: inherit;
  border: none;
  font-size: 1.75rem;
  padding: 0;
}

.bottom_arrow {
  left: 50%;
  bottom: 0;
  width: 0.75rem;
  height: 0.75rem;
  transform: translate(-50%, 50%) rotate(45deg);
  background: white;
}
</style>
  
  