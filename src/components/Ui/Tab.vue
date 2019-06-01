<template>
  <li class="tab">
    <router-link :to="to" active-class="active" exact>
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
  font-family: @special-font;
  a {
    color: @text-color;
    text-decoration: none;
    display: inline-block;
    padding: 0 12px;
    font-weight: normal;

    &.active {
      background-image: linear-gradient(
        to bottom,
        #fabe00,
        #ffc400 30%,
        #ffc400 70%,
        #ff8800
      ) !important;
      background-size: cover;
      background-repeat: no-repeat;
      color: black !important;
    }
  }
}
</style>
