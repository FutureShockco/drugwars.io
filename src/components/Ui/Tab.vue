<template>
  <li class="tab">
    <router-link :to="to" active-class="active">
      <slot></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['to']
};
</script>

<style scoped lang="less">
@import '../../vars';

.tab {
  display: inline-block;

  a {
    text-decoration: none;
    display: inline-block;
    padding: 0 15px;
    line-height: 56px;

    &.active {
      background-color: @primary-color;
      color: @bg-color;
    }
  }
}
</style>
