<template>
    <div>
        <div class="bottomnav brush-black">
            <ul class="bottomnav list-style-none width-full text-center pt-1 pb-2 border-bottom">
                <li>
                    <router-link to="/overview" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Overview
                    </router-link>
                </li>
                <li>
                    <router-link to="/buildings" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Buildings
                    </router-link>
                </li>
                <li>
                    <router-link to="/units" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Bootcamp
                    </router-link>
                </li>
                <li>
                    <router-link to="/actions" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Actions
                        <span class="text-red" v-if="activeIncFightsCount > 0">
                  ({{ activeIncFightsCount }}<i class="iconfont icon-arrow-down"></i>)
                </span> <span class="text-green" v-if="activeFightsCount > 0">
                  ({{ activeFightsCount }}<i class="iconfont icon-arrow-up"></i>)
                </span>
                        <span class="text-blue" v-if="activeIncTransportsCount > 0">
                  ({{ activeIncTransportsCount }}<i class="iconfont icon-arrow-down"></i>)
                </span>
                        <span class="text-blue" v-if="activeTransportsCount > 0">
                  ({{ activeTransportsCount }}<i class="iconfont icon-arrow-up"></i>)
                </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/map" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Map
                    </router-link>
                </li>
                <li>
                    <router-link to="/leaderboards/fights" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Leaderboards
                    </router-link>
                </li>
                <li>
                    <router-link to="/gangs" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Gangs
                    </router-link>
                </li>
                <!-- <li>
                <router-link
                  to="/contracts"
                  class="py-1 px-4 d-block"
                  @click.native="toggleSidebar"
                >
                  Contracts
                </router-link>
              </li> -->
                <li>
                    <router-link to="/jobs" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Jobs
                    </router-link>
                </li>
                <li>
                    <router-link to="/rewards" class="py-1 px-4 d-block sidebar-rewards" @click.native="toggleSidebar">
                        Rewards
                    </router-link>
                </li>
                <li>
                    <router-link to="/market/shop" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Market
                    </router-link>
                </li>
            </ul>
            <ul class="pt-1 pb-2 border-bottom">
                <li>
                    <router-link to="/settings" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Settings
                    </router-link>
                </li>
                <li>
                    <router-link to="/help" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                        Help
                    </router-link>
                </li>
                <li>
                    <a href="https://drugwars.tokenbb.io/" target="_blank" class="py-1 px-4 d-block">
                  Forum
                </a>
                </li>
            </ul>
            <ul class="pt-1 pb-2 border-bottom">
                <li>
                    <a @click.prevent="logout" class="py-1 px-4 text-gray d-block">
                  LOGOUT
                </a>
                </li>
            </ul>
        </div>
        <!-- <div class="prize mx-auto">
                    {{this.prizeProps.drug_production_rate * 60 * 60 * 24 | amount}} DRUGS are produced per day. You will receive <span
                            id="earnings" style="color:#fbbd08;font-weight: 700;">{{Math.round(totalRewards.daily)}}</span>
                    DWD based on your production of {{this.user.drug_production_rate * 60 * 60 * 24 | amount}} DRUGS ({{overall}}%)
            </div> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    config() {
      return {
        options: [
          {
            value: 'Attack',
          },
          {
            value: 'Transport',
          },
        ],
        backgroundColor: 'green',
      };
    },
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },
    username() {
      return this.$store.state.auth.username;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    rank() {
      return this.$store.state.game.user.rank[0].rank;
    },
    xp() {
      return this.$store.state.game.user.user.xp;
    },
    activeIncFightsCount() {
      if (this.$store.state.game.inc_fights_count) {
        return this.$store.state.game.inc_fights_count;
      }
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.sent_fights_count) {
        return this.$store.state.game.sent_fights_count;
      }
      return 0;
    },
    activeIncTransportsCount() {
      if (this.$store.state.game.inc_transports_count) {
        return this.$store.state.game.inc_transports_count;
      }
      return 0;
    },
    activeTransportsCount() {
      if (this.$store.state.game.sent_transports_count) {
        return this.$store.state.game.sent_transports_count;
      }
      return 0;
    },
  },
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';
@media screen and (min-width: 200px) and (max-width: 1119px) {
  .prize {
    visibility: hidden;
  }
}

.prize {
  color: rgb(153, 153, 153);
  position: fixed;
  top: 74px;
  z-index: 1500;
  text-align: center;
  font-size: 12px; // max-width: 1120px;
  width: 100%;
}

.bottomnav {
  color: @heading-color;
  position: fixed;
  z-index: 100;
  top: calc(100vh - @header-height);
  left: 0;
  width: 100%;
  height: @header-height;
  color: white;
  font-size: 26px;
  font-weight: 500;
  display: inline-flex;
  line-height: 22px;
  font-family: @heading-font;
  text-align: left !important;
  transition: width 0.3s;
  box-shadow: -1px 5px 5px black;
  z-index: 1000;
  @media @bp-small {
    height: @bottomnav-height;
  }
  .logo {
    margin-top: 0px;
    height: 45px;
  }
  .bottomnav-logo {
    width: 100%;
    max-width: 200px;
    .iconfont {
      margin-top: 10px;
      font-size: 40px;
      color: white;
    }
  }
  .bottomnav-content {
    max-width: @main-width;
    width: 100%;
    height: 60px;
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
    min-width: 80px;
  }
  @media screen and (min-width: 399px) and (max-width: 1119px) {
    .shield {
      min-width: 80px;
      img {
        width: 24px;
        height: 24px;
        margin-top: 10px;
      }
    }
  }
}
</style>
