<template> 
  <img
    class="icon"
    :src="`/img/icons/${icon}.svg`"
    :style="{
      width: `${this.size}px`,
      height: `${this.size}px`,
      background: `${this.color}`,
    }"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 32,
    },
  },
};
</script>

<style scoped lang="less">
.icon {
  margin-bottom: -3px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
