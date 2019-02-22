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
  background-color: #000;
  background-image: linear-gradient(to bottom, #000, #1f1f1f 74%) !important;
  box-shadow: 0 0 8px #000, 0 0 8px #000 !important;
  border: 1px solid #282828;
  border-top: none;

  a {
    color: @white-darker;
    text-decoration: none;
    display: inline-block;
    padding: 0 15px;
    letter-spacing: 2px;
    font-weight: normal;

    &.active {
      background: linear-gradient(to bottom, #fbbd08, #fbb034 74%) !important;
      color: @bg-color;
    }
  }
}
</style>
