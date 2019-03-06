<template>
  <ul class="balances list-style-none">
    <li class="d-flex">
      <Icon name="drugs"/>
      <div>
        <div :class="{ 'text-red': balances.drugs >= user.drug_storage }">
          {{ balances.drugs | amount }} DRUGS
        </div>
        <div class="detail">
          +{{ user.drug_production_rate * 60 * 60 * 24 | amount}} / DAY
        </div>
                <div class="detail" v-if="drugBonus">
          <span class="text-green">+{{drugBonus | amount}}</span> BONUS
        </div>
      </div>
    </li>
    <li class="d-flex">
      <Icon name="weapons"/>
      <div>
        <div :class="{ 'text-red': balances.weapons >= user.weapon_storage }">
          {{ balances.weapons | amount }} WEAPONS
        </div>
          <div class="detail">
            +{{ user.weapon_production_rate * 60 * 60 * 24 | amount}} / DAY 
                        
        </div>
          <div class="detail" v-if="weaponBonus">
          <span class="text-green">+{{weaponBonus | amount}}</span> BONUS
        </div>
      </div>
    </li>
    <li class="d-flex">
      <Icon name="alcohols"/>
      <div>
        <div :class="{ 'text-red': balances.alcohols >= user.alcohol_storage }">
          {{ balances.alcohols | amount }} ALCOHOL
        </div>
            <div class="detail">
            +{{ user.alcohol_production_rate * 60 * 60 * 24 | amount}} / DAY
        </div>
           <div class="detail" v-if="alcoholBonus">
            <span class="text-green">+{{alcoholBonus | amount}}</span> BONUS
        </div>
      </div>
    </li>
    <li class="d-flex">
      <Icon name="steem"/>
      <div>
        <div>{{ steemBalance | amount }} STEEM</div>
         <div class="detail"> DAILY <span class="detail text-green">
        +{{ totalRewards.myRewards}} STEEM</span></div>
                 <div class="detail"> HEIST <span class="detail text-green">
        +{{ totalRewards.amount}} STEEM</span></div>
      </div>
    </li>
  </ul>
</template>

<script>
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
      const time = (this.$store.state.ui.timestamp - Date.parse(this.user.last_update)) / 1000;
      let oc = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center').lvl;
      const drugs =
        this.user.drugs_balance +
        time * this.user.drug_production_rate +
        this.user.drug_production_rate * time * oc * 0.005;
      const weapons =
        this.user.weapons_balance +
        time * this.user.weapon_production_rate +
        this.user.weapon_production_rate * time * oc * 0.005;
      const alcohols =
        this.user.alcohols_balance +
        time * this.user.alcohol_production_rate +
        this.user.alcohol_production_rate * time * oc * 0.005;
      return {
        drugs: drugs > this.user.drug_storage ? this.user.drug_storage : drugs,
        weapons: weapons > this.user.weapon_storage ? this.user.weapon_storage : weapons,
        alcohols: alcohols > this.user.alcohol_storage ? this.user.alcohol_storage : alcohols,
      };
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
      return parseFloat(this.$store.state.auth.account.balance);
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
  font-size: 16px;
  font-weight: 600;
  line-height: 1em;
  display: inline-flex;
  li {
    padding: 10px;
    border-left: 1px rgb(10, 10, 10) solid;
    border-right: 1px rgb(10, 10, 10) solid;
    .text-gray {
      font-size: 14px;
    }
    .detail {
      font-size: 12px;
    }
  }

  .iconfont {
    font-size: 36px;
    line-height: 36px;
    margin-right: 10px;
    font-weight: 100;
  }
}

@media screen and (min-width: 200px) and (max-width: 799px) {
  .balances {
    font-size: 8px !important;
    margin-top: 10px !important;
    li {
      padding: 5px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .text-gray {
        font-size: 6px;
      }
      .detail {
        margin-top: 5px;
        font-size: 7px;
      }
    }
  }
  .iconfont {
    font-size: 12px !important;
    line-height: 24px !important;
    font-weight: 100;
    margin-right: 10px;
  }
}

@media screen and (min-width: 800px) and (max-width: 1119px) {
  .balances {
    font-size: 14px !important;
    margin-top: 10px !important;
    line-height: 8px !important;
    li {
      padding: 5px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .text-gray {
        font-size: 9px;
      }
      .detail {
        margin-top: 5px;
        font-size: 9px;
      }
    }
  }
  .iconfont {
    font-size: 24px !important;
    line-height: 24px !important;
    font-weight: 100;
    margin-right: 10px;
  }
}
</style>
