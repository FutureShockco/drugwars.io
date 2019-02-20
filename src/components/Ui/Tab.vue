<template>
  <li class="tab border-right">
    <router-link :to="to" active-class="active">
      <slot></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['to'],
};
</script>

<style scoped lang="less">
@import '../../vars';

.tab {
  display: inline-block;

  a {
    color: @primary-color;
    text-decoration: none;
    display: inline-block;
    padding: 0 15px;
    line-height: 56px;
    letter-spacing: 2px;

    &.active {
      background: linear-gradient(to bottom, #fbbd08, #fbb034 74%) !important;
      color: @bg-color;
    }
  }
}
</style>
