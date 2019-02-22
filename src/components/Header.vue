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
  props: ['title'],
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';

.header {
  font-family: @heading-font;
  background-color: @sidebar-bg-color;
  color: @white-darker;
  font-size: 20px;
  letter-spacing: 2px;
  z-index: 100;
  top: 0;
  width: 100%;
  height: @header-height;
  line-height: @header-height;
  display: flex;
  align-items: center;
  transition: width 0.3s;
}
</style>
