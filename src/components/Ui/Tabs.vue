<template>
  <ul class="tabs">
    <slot></slot>
  </ul>
</template>

<style scoped lang="less">
@import '../../vars';

.tabs {
  overflow: hidden;
  height: @header-height;
}
.tabs .tab {
  text-transform: uppercase;
  color: black !important;

  margin: 0;
  font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #000;
  background-image: linear-gradient(to bottom, #000, #1f1f1f 74%) !important;
  border: 1px solid #282828;
  box-shadow: 0 0 8px #000, 0 0 8px #000 !important;
  width: fit-content;
  padding: 0px;
  outline: none;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
</style>
