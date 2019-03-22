<template>
  <ul class="balances list-style-none">
    <li>
         <Icon name="drug" size="36"/>
         <div class="balance">
        <div :class="{ 'text-red': balances.drugs >= user.drug_storage }">
          {{ balances.drugs | amount }} <span class="mini"> DRUGS</span>
        </div>
        <div class="detail">
        +{{ user.drug_production_rate * 60 * 60 * 24 | amount}}<span class="text-orange" v-if="drugBonus"> +{{drugBonus | amount}}</span>/DAY
        </div>
                <div class="detail">
         <span class="text-green">{{user.drug_storage/100*25 | amount}}</span> /SAFE
        </div>
        </div>
    </li>
    <li>
      <Icon name="weapon" size="36"/>
       <div class="balance">
        <div :class="{ 'text-red': balances.weapons >= user.weapon_storage }">
          {{ balances.weapons | amount }} <span class="mini"> WEAPONS</span>
        </div>
          <div class="detail">
           +{{ user.weapon_production_rate * 60 * 60 * 24 | amount}} <span class="text-orange" v-if="weaponBonus">+{{weaponBonus | amount}}</span>/DAY                  
        </div>
                        <div class="detail">
         <span class="text-green">{{user.weapon_storage/100*25 | amount}}</span> /SAFE
        </div>
        </div>
    </li>
    <li>
       <Icon name="alcohol" size="36"/>
        <div class="balance">
        <div :class="{ 'text-red': balances.alcohols >= user.alcohol_storage }">
          {{ balances.alcohols | amount }}<span class="mini"> ALCOHOL</span>
        </div>
            <div class="detail">
            +{{ user.alcohol_production_rate * 60 * 60 * 24 | amount}} <span class="text-orange" v-if="alcoholBonus">+{{alcoholBonus | amount}}</span>/DAY
        </div>
                                <div class="detail">
          <span class="text-green">{{user.alcohol_storage/100*25 | amount}}</span> /SAFE
        </div>
         </div>
    </li>
    <li>
      <Icon name="steem" size="36"/>
        <div class="balance">
        <div>{{ steemBalance}} <span class="mini"> STEEM</span></div>
         <div class="detail"> DAILY: <span class="detail text-green">
        {{ totalRewards.myRewards}} STEEM</span></div>
                 <div class="detail"> HEIST: <span class="detail text-green">
        {{ totalRewards.amount}} STEEM</span></div>
         </div>
    </li>
  </ul>
</template>

<script>
import { getBalances } from '@/helpers/utils';

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
    balances() {
      let ocLvl = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        ocLvl = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
          .lvl;
      return getBalances(this.user, ocLvl, this.$store.state.ui.timestamp);
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
    totalReward() {
      return (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.heist_percent;
    },
    totalRewards() {
      const totalDailySteem =
        (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.daily_percent;
      const myRewards = parseFloat(
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * totalDailySteem,
      ).toFixed(3);
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = parseFloat((this.totalReward / 100) * percent).toFixed(3);
      return { myRewards, amount };
    },
    steemBalance() {
      return parseFloat(this.$store.state.auth.account.balance).toFixed(3);
    },
    drugBonus() {
      let oc = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center').lvl;
      return this.user.drug_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    weaponBonus() {
      let oc = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center').lvl;
      return this.user.weapon_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    alcoholBonus() {
      let oc = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center').lvl;
      return this.user.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.balances {
  color: white;
  font-size: 28px;
  font-weight: 500;
  display: inline-flex;
  line-height: 22px;
  font-family: @heading-font;
  li {
    padding: 15px 5px 0px 5px;
    border-left: 1px rgb(10, 10, 10) solid;
    border-right: 1px rgb(10, 10, 10) solid;

    .balance {
      float: right;
      text-align: right;
    }

    span {
      float: right;
      line-height: 42px;
    }
    .text-gray {
      font-size: 16px;
    }
    .detail {
      font-size: 14px;
      line-height: 14px !important;
      text-align: left;
      span {
        float: none;
        line-height: 14px !important;
      }
    }
    .icon {
      font-size: 32px;
      line-height: 32px;
      margin-right: 10px;
      font-weight: 100;
    }
  }
  .mini {
    font-size: 12px;
    margin-top: -20px;
    text-align: left;
  }
}

@media screen and (min-width: 200px) and (max-width: 669px) {
  .balances {
    display: flex;
    font-size: 16px !important;
    margin-top: 15px !important;
    line-height: 12px !important;
    li {
      padding: 5px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .balance {
        float: right;
        text-align: left;
      }
      span {
        float: right;
        line-height: 42px;
      }
      .text-gray {
        font-size: 4px;
      }
      .detail {
        margin: 0px;
        display: -webkit-inline-box;
        line-height: 4px !important;
        font-size: 6px;
      }
    }
    .mini {
      text-align: left;
      position: absolute;
      font-size: 6px;
      margin-top: -18px;
    }
    .icon {
      display: none;
      float: left;
      width: 16px;
      height: 16px;
    }
  }
}

@media screen and (min-width: 670px) and (max-width: 1119px) {
  .balances {
    display: inline-flex;
    font-size: 20px !important;
    margin-top: 10px !important;
    line-height: 16px !important;
    li {
      padding: 15px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .balance {
        float: right;
        text-align: left;
      }
      span {
        float: right;
        line-height: 42px;
        min-width: 50px;
      }
      .text-gray {
        font-size: 6px;
      }
      .detail {
        font-size: 9px;
      }
    }
    .mini {
      font-size: 11px;
      margin-top: -20px;
      text-align: left;
      position: absolute;
    }
    .icon {
      float: left;
      font-weight: 100;
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  }
}
</style>
