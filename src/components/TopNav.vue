<template>
    <div>
        <div class="topnav brush-black">
            <div class="topnav-content d-flex mx-auto">
                <div class="topnav-logo hide-sm hide-md hide-lg text-center">
                    <router-link to="/">
                        <img src="/img/drugwars.png" class="logo" name="logo" />
                    </router-link>
                </div>
                <button class="float-left px-3 py-3 border-right" @click="toggleSidebarVisibility">
            <span class="iconfont icon-three-bars"/>
          </button>
    
                <Balances class="width-full text-center" />
                <div class="shield text-center hide-sm hide-md hide-lg mt-2">
                    <Icon v-if="shieldEnd" name="shield" size="26" class="text-gray" />
                    <div v-if="shieldEnd" class="text-gray">{{ shieldEnd | ms }}</div>
                </div>
            </div>
        </div>
        <!-- <div class="prize mx-auto">
                    {{this.prizeProps.drug_production_rate * 60 * 60 * 24 | amount}} DRUGS are produced per day. You will receive <span
                            id="earnings" style="color:#fbbd08;font-weight: 700;">{{totalRewards.daily | amount}}</span>
                    DWD based on your production of {{this.user.drug_production_rate * 60 * 60 * 24 | amount}} DRUGS ({{overall}}%)
            </div> -->
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
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.daily_percent) /
        0.005
      );
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    overall() {
      return parseFloat(
        (100 * this.$store.state.game.user.user.drug_production_rate) /
          this.$store.state.game.prizeProps.drug_production_rate,
      ).toFixed(3);
    },
    totalRewards() {
      const daily = parseFloat(
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * this.totalDaily,
      ).toFixed(3);
      return { daily };
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
    height: 45px;
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
    font-size: 10px;
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
