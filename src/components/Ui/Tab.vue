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
  text-transform: uppercase;
  color: black !important;

  a {
    color: @white-darker;
    text-decoration: none;
    display: inline-block;
    padding: 0 15px;
    font-weight: normal;

    &.active {
      background: @primary-color;
      color: @bg-color;
    }
  }
}
</style>
