<template>
  <div class="topnav brush-black">
    <div class="topnav-content d-flex mx-auto">
      <button class="float-left px-4 py-3 border-right" @click="toggleSidebarVisibility">
        <span class="iconfont icon-three-bars"/>
      </button>
      <div class="topnav-logo hide-sm hide-md hide-lg text-center">
        <router-link to="/">
          <img src="/img/drugwars.png" class="logo" name="logo"/>
        </router-link>
      </div>
          <Balances class="width-full flex-justify-center"/>
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
  box-shadow: -1px 5px 5px black;
  z-index: 1000;
  @media @bp-small {
    height: @topnav-height;
  }
  .logo {
    margin-top: 5px;
  }

  .topnav-logo {
    width: 100%;
    max-width: 200px;
    .iconfont {
      margin-top: 10px;
      font-size: 40px;
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
