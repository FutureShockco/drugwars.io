<template>
  <div class="topnav border-bottom">
    <div class="topnav-content mx-auto">
      <button class="float-left px-4 py-3 border-right" @click="toggleSidebarVisibility">
        <span class="iconfont icon-three-bars"/>
      </button>
      <div class="topnav-logo px-3 float-left hide-small">
        <router-link to="/">
          <img src="/img/logo.png">
        </router-link>
      </div>
      <ul class="balances m-0 float-left mt-2 ml-2">
        <li class="mr-2 mr-lg-4">
          <img class="mr-2" align="absmiddle" src="/img/icons/drugs.png"/>
          <span class="mr-2">{{ user.drugs_balance | amount }}</span>
          <span class="text-gray hide-small">{{ user.drug_production_rate * 3600 * 24 | amount }} / day</span>
        </li>
        <li class="mr-2 mr-lg-4">
          <img class="mr-2" align="absmiddle" src="/img/icons/weapons.png"/>
          <span class="mr-2">{{ user.weapons_balance | amount }}</span>
          <span class="text-gray hide-small">{{ user.weapon_production_rate * 3600 * 24 | amount }} / day</span>
        </li>
        <li class="mr-2 mr-lg-4">
          <img  class="mr-2" align="absmiddle" src="/img/icons/alcohols.png"/>
          <span class="mr-2">{{ user.alcohols_balance | amount }}</span>
          <span class="text-gray hide-small">{{ user.alcohol_production_rate * 3600 * 24 | amount }} / day</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions(['toggleSidebarVisibility']),
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
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

  @media @bp-small {
    height: @topnav-height;
  }

  .topnav-logo {
    text-align: center;
    width: @sidebar-width;

    img {
      width: 100%;
    }
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

  .balances {
    li {
      display: inline-block;

      img {
        width: 24px;
      }
    }

    @media @bp-small {
      img {
        width: 38px !important;
      }
    }
  }
}
</style>
