<template>
  <div class="topnav border-bottom brush-black">
    <div class="topnav-content d-flex mx-auto">
      <button class="float-left px-4 py-3 border-right" @click="toggleSidebarVisibility">
        <span class="iconfont icon-three-bars"/>
      </button>
      <div class="topnav-logo hide-sm hide-md hide-lg text-center">
        <router-link to="/">
          <Icon name="logo"/>
        </router-link>
      </div>
      <div class="ml-4 width-full d-flex flex-column flex-justify-center">
        <div class="prize">
          Today prize <span class="hide-sm hide-md hide-lg">pool</span>: ${{ parseInt(total) }}
        </div>
        <span class="text-gray hide-sm hide-md hide-lg mb-1">
          Daily: <b>${{ parseInt(totalDaily) }}</b>
          + Heist: <b>${{ parseInt(totalHeist) }}</b>,
          you will receive: <span class="text-green">+X.XXX STEEM</span> in {{ timeToWait | ms }}
        </span>
      </div>
      <div class="shield text-center hide-sm hide-md hide-lg" v-if="shieldEnd">
        <Icon name="shield1" size="26" class="text-gray"/>
        <div class="text-gray">{{ shieldEnd | ms }}</div>
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
    shieldEnd() {
      const diff =
        this.$store.state.game.user.user.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
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
  display: flex;
  align-items: center;
  transition: width 0.3s;

  @media @bp-small {
    height: @topnav-height;
  }

  .topnav-logo {
    width: 100%;
    max-width: 200px;

    .iconfont {
      margin-top: 10px;
      font-size: 38px;
      color: white;
    }
  }

  .topnav-content {
    max-width: @main-width;
    width: 100%;

    .prize {
      font-size: 22px;
      font-family: @heading-font;
    }

    .username {
      font-size: 22px;
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

  .shield {
    min-width: @sidebar-width;
  }
}
</style>
