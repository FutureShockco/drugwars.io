<template>
  <div class="header border-bottom">
    <slot>
      <span class="ml-4">{{ title }}</span>
    </slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    title: {
      type: String,
    },
  },
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';

.header {
  color: @heading-color;
  font-size: 18px;
  z-index: 100;
  top: 0;
  width: 100%;
  height: @header-height;
  display: flex;
  background: #2a2a34;
  align-items: center;
  transition: width 0.3s;
}
</style>
