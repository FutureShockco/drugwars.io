<template>
  <div class="topnav border-bottom">
    <div class="topnav-content mx-auto">
      <button class="float-left px-4 py-3 border-right" @click="toggleSidebarVisibility">
        <span class="iconfont icon-three-bars"/>
      </button>
      <div class="topnav-logo float-left pt-2 hide-small">
        <img src="/img/logo.png" height="38">
      </div>
      <Balances/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';

.topnav {
  color: @heading-color;
  font-size: 18px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
  overflow: hidden;
  background-color: #000;
  display: flex;
  align-items: center;
  transition: width 0.3s;

  .topnav-logo {
    text-align: center;
    width: @sidebar-width;
  }

  .topnav-content {
    max-width: @main-width;
    width: 100%;
  }

  button {
    line-height: 22px;
    background: none;
    border: none;
    outline: none;

    @media @bp-small {
      display: none;
    }

    .iconfont {
      color: @border-color !important;
      font-size: 20px;
    }
  }
}
</style>
