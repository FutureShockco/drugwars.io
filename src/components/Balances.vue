<template>
  <ul class="balances list-style-none">
    <li class="d-flex">
      <Icon name="drugs"/>
      <div>
        <div :class="{ 'text-red': balances.drugs === user.drug_storage }">
          {{ balances.drugs | amount }} DRUGS
        </div>
        <div class="detail">
          +{{ user.drug_production_rate * 60 * 60 * 24 | amount}} / DAY <span class="text-green" v-if="drugBonus">+{{drugBonus | amount}}</span>
        </div>
      </div>
    </li>
    <li class="d-flex">
      <Icon name="weapons"/>
      <div>
        <div :class="{ 'text-red': balances.weapons === user.weapon_storage }">
          {{ balances.weapons | amount }} WEAPONS
        </div>
          <div class="detail">
            +{{ user.weapon_production_rate * 60 * 60 * 24 | amount}} / DAY <span class="text-green" v-if="weaponBonus">+{{weaponBonus | amount}}</span>
        </div>
      </div>
    </li>
    <li class="d-flex">
      <Icon name="alcohols"/>
      <div>
        <div :class="{ 'text-red': balances.alcohols === user.alcohol_storage }">
          {{ balances.alcohols | amount }} ALCOHOL
        </div>
            <div class="detail">
            +{{ user.alcohol_production_rate * 60 * 60 * 24 | amount}} / DAY <span class="text-green" v-if="alcoholBonus">+{{alcoholBonus | amount}}</span>
        </div>
      </div>
    </li>
    <li class="d-flex hide-sm">
      <Icon name="steem"/>
      <div>
        <div>{{ steemBalance | amount }} STEEM</div>
          <div class="detail text-green">
        +{{ totalRewards}} STEEM</div>
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
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      const time = (this.$store.state.ui.timestamp - Date.parse(this.user.last_update)) / 1000;
      const drugs =
        this.user.drugs_balance +
        time * this.user.drug_production_rate +
        time * oc * 0.005 * this.user.drug_production_rate;
      const weapons =
        this.user.weapons_balance +
        time * this.user.weapon_production_rate +
        time * oc * 0.005 * this.user.weapon_production_rate;
      const alcohols =
        this.user.alcohols_balance +
        time * this.user.alcohol_production_rate +
        time * oc * 0.005 * this.user.alcohol_production_rate;
      return {
        drugs: drugs > this.user.drug_storage ? this.user.drug_storage : drugs,
        weapons: weapons > this.user.weapon_storage ? this.user.weapon_storage : weapons,
        alcohols: alcohols > this.user.alcohols_storage ? this.user.alcohols_storage : alcohols,
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
      const myRewards =
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * totalDailySteem;
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = (this.totalReward / 100) * percent;
      return parseFloat(myRewards + amount).toFixed(3);
    },
    steemBalance() {
      return parseFloat(this.$store.state.auth.account.balance);
    },
    drugBonus() {
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      return this.user.drug_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    weaponBonus() {
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      return this.user.weapon_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    alcoholBonus() {
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      return this.user.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
  },
};
</script>

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
                <div class="detail">
          <span class="text-green" v-if="drugBonus">+{{drugBonus | amount}}</span> BONUS
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
          <div class="detail">
          <span class="text-green" v-if="weaponBonus">+{{weaponBonus | amount}}</span> BONUS
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
           <div class="detail">
            <span class="text-green" v-if="alcoholBonus">+{{alcoholBonus | amount}}</span> BONUS
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
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
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
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      return this.user.drug_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    weaponBonus() {
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
      return this.user.weapon_production_rate * 60 * 60 * 24 * oc * 0.005;
    },
    alcoholBonus() {
      const oc = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
        .lvl || {
        lvl: 0,
      };
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

@media screen and (min-width: 200px) and (max-width: 1119px) {
  .balances {
    font-size: 10px !important;
    margin-top: 10px !important;
    li {
      padding: 5px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .text-gray {
        font-size: 8px;
      }
      .detail {
        margin-top: 5px;
        font-size: 9px;
      }
    }
  }
  .iconfont {
    font-size: 16px !important;
    line-height: 24px !important;
    margin-right: 10px;
  }
}
</style>
