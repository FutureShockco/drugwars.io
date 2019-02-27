<template>
  <li class="tab">
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
    color: @text-color;
    text-decoration: none;
    display: inline-block;
    padding: 0 12px;
    font-weight: normal;

    &.active {
      background-image: url('/img/brush-yellow.svg');
      background-size: 100px 100%;
      background-position: -4px 36px;
      background-repeat: no-repeat;

      color: @heading-color;
    }
  }
}
</style>
