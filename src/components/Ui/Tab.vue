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
  font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
  box-shadow: 0 0 8px #000, 0 0 8px #000 !important;
  border: 1px solid #282828;
  background: url(/img/stripe.png) top left;
  border-top: none;
  text-transform: uppercase;
  font-weight: 800;
  text-shadow: 0 1px 3px #000;
  a {
    color: @primary-color;
    text-decoration: none;
    display: inline-block;
    padding: 0 15px;
    line-height: 45px;
    letter-spacing: 2px;
    font-weight: normal;

    &.active {
      background-image: radial-gradient(
        ellipse farthest-corner at center 0px,
        #ffc400 -150%,
        #ffc400 45%,
        #ff8800 85%
      );
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0), inset 0 0 1px 1px #ff8800;
    }
  }
}
</style>
