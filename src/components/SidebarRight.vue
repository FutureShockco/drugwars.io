<template>
  <div class="sidebar sidebar-right border-left border-sm-right pt-3">
    <ul class="balances px-4 mb-4 list-style-none">
      <li>
        <h4>Balances</h4>
      </li>
      <li class="d-flex">
        <Icon name="drugs"/>
        <div>
          <div :class="{ 'text-red': balances.drugs === user.drug_storage }">
            {{ balances.drugs | amount }}
          </div>
          <div class="text-gray">DRUGS</div>
        </div>
      </li>
      <li class="d-flex">
        <Icon name="weapons"/>
        <div>
          <div :class="{ 'text-red': balances.weapons === user.weapon_storage }">
            {{ balances.weapons | amount }}
          </div>
          <div class="text-gray">WEAPONS</div>
        </div>
      </li>
      <li class="d-flex">
        <Icon name="alcohols"/>
        <div>
          <div :class="{ 'text-red': balances.alcohols === user.alcohol_storage }">
            {{ balances.alcohols | amount }}
          </div>
          <div class="text-gray">ALCOHOLS</div>
        </div>
      </li>
      <li class="d-flex hide-sm">
        <Icon name="steem"/>
        <div>
          <div>{{ steemBalance | amount }}</div>
          <div class="text-gray">STEEM</div>
        </div>
      </li>
    </ul>
    <div class="px-4">
      <h4>Heist</h4>
      <Heist/>
    </div>
  </div>
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
      const drugs = this.user.drugs_balance + time * this.user.drug_production_rate;
      const weapons = this.user.weapons_balance + time * this.user.weapon_production_rate;
      const alcohols = this.user.alcohols_balance + time * this.user.alcohol_production_rate;
      return {
        drugs: drugs > this.user.drug_storage ? this.user.drug_storage : drugs,
        weapons: weapons > this.user.weapon_storage ? this.user.weapon_storage : weapons,
        alcohols: alcohols > this.user.alcohols_storage ? this.user.alcohols_storage : alcohols,
      };
    },
    steemBalance() {
      return parseFloat(this.$store.state.auth.account.balance);
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.balances {
  color: white;
  font-size: 18px;
  line-height: 1.2em;

  li {
    margin-bottom: 18px;

    .text-gray {
      font-size: 14px;
    }
  }

  .iconfont {
    font-size: 36px;
    line-height: 36px;
    margin-right: 10px;
  }
}
</style>
