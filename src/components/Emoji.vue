<template>
  <div v-show="chooseEmoji" class="emoji-wrapper">
    <span
      class="emoji-item"
      v-for="(value, key, index) of emojiList"
      :key="index"
      @click="addEmoji(key, value)"
    >
      <div class="emoji" width="24" height="24">
        {{ value }}
      </div>
    </span>
  </div>
</template>

<script>
import EmojiList from "../assets/js/emoji";
export default {
  props: {
    chooseEmoji: {
      type: Boolean
    }
  },
  data: function() {
    return {
      emojiList: EmojiList
    };
  },
  methods: {
    addEmoji(key, value) {
      this.$emit("addEmoji", value);
    }
  }
};
</script>

<style scoped>
.emoji {
  user-select: none;
  margin: 0.25rem;
  display: inline-block;
  vertical-align: middle;
}
.emoji-item {
  cursor: pointer;
  display: inline-block;
}
.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}
.emoji-wrapper {
  max-height: 150px;
  overflow-y: auto;
}
</style>
