<template>
  <div class="header border-bottom">
    <button class="px-4 py-3 border-right" @click="toggleSidebarVisibility">
      <span class="iconfont icon-three-bars"/>
      </button>
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
@import (reference) '../vars';

.header {
  color: @heading-color;
  font-size: 18px;
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: @header-height;
  background-color: #000;
  background-image: linear-gradient(315deg, #000, #0e0e0e 74%);
  display: flex;
  align-items: center;
  transition: width 0.3s;

  @media @bp-small {
    position: relative;
  }

  & > button {
    line-height: 22px;
    background: none;
    border: none;
    outline: none;

    @media @bp-small {
      display: none;
    }

    & > .iconfont {
      color: @border-color !important;
      font-size: 20px;
    }
  }
}
</style>
