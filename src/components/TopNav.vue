<template>
  <div class="topnav border-bottom">
    <div class="topnav-content d-flex mx-auto">
      <button class="float-left px-4 py-3 border-right" @click="toggleSidebarVisibility">
        <span class="iconfont icon-three-bars"/>
      </button>
      <div class="topnav-logo hide-sm hide-md hide-lg text-center">
        <router-link to="/">
          <img src="/img/logo.png">
        </router-link>
      </div>
      <div class="ml-4 text-center width-full">
        <div class="ann">
          Today prize pool: <span class="username">${{ parseInt(total) }}</span>
        </div>
        <span class="text-gray">
          daily: <b>${{ parseInt(totalDaily) }}</b>
          + heist: <b>${{ parseInt(totalHeist) }}</b>,
          payment <b>in {{ timeToWait | ms }}</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight - this.$store.state.ui.timestamp;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) *
        (prizePops.daily_percent + prizePops.heist_percent)
      );
    },
    totalDaily() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.daily_percent
      );
    },
    totalHeist() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.heist_percent
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
  },
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';

.topnav {
  color: @heading-color;
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

  @media @bp-small {
    height: @topnav-height;
  }

  .topnav-logo {
    width: 100%;
    max-width: 200px;

    img {
      width: calc(@sidebar-width - 30px);
    }
  }

  .topnav-content {
    max-width: @main-width;
    width: 100%;
    padding-right: 0;

    .ann {
      font-size: 20px;
    }

    .username {
      font-size: 22px;
    }

    @media @bp-small {
      padding-right: @sidebar-width;
    }
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
